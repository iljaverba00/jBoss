import {observer} from 'mobx-react';
import React, { Component } from 'react';

import RenderController from '../controllers/RenderController';


export class Content extends Component {

	constructor(props){
		super(props);
		this.state = {
			map: null,
			extentLayer: null,
			wmsGroup: null,
			config: null,
			drawBox: null,
			configs: []
		};
	}

	componentWillMount(){
		let extentLayer = new ol.layer.Vector({
			source: new ol.source.Vector(),
			style: function(feature, resolution){
				if (feature.get('active')) {
					return new ol.style.Style({
						fill: new ol.style.Fill({color: [255, 255, 255, 0.3]}),
						stroke: new ol.style.Stroke({color: 'red', width: 2})
					});
				}else{
					return new ol.style.Style({
						fill: new ol.style.Fill({ color: [255,255,255,0.3] }),
						stroke: new ol.style.Stroke({ color: 'blue', width: 2 })
					});
				}
			}
		});
		extentLayer.setZIndex(1000);
		let wmsGroup = new ol.layer.Group();
		this.setState({ extentLayer, wmsGroup });
	}

	componentDidMount(){
		let map = new ol.Map({
			target: 'map',
			controls: [
				new ol.control.ZoomSlider()
			],
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				}),
				this.state.extentLayer,
				this.state.wmsGroup
			],
			view: new ol.View({
				center: [9231701.188869197,7362917.765983323],
				zoom: 5
			})
		});
		var drawBox = new ol.interaction.Draw({
			condition: ol.events.condition.shiftKeyOnly,
			style: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: [255, 165, 0, 1],
					width: 2
				})
			}),
			geometryFunction: ol.interaction.Draw.createBox()
		});
		drawBox.on('drawend', e => {
			let config = this.state.config;
			if (config) {
				var geom = e.feature.getGeometry();
				config.extent = geom.getExtent().join(',');
				this.updateExtents(this.state.configs);
			}
		});
		map.addInteraction(drawBox);
		this.state.map = map;
		this.state.drawBox = drawBox;
		this.setState(this.state);
	}

    render(){
        return (
            <div className="settings">
                <Settings
					setCurrentConfig={ config => this.setCurrentConfig(config) }
					fitConfig={ e => this.fitConfig(this.state.config) }
					updateExtents={ configs => this.updateExtents(configs) }

					parent={this}

					renderCtrl={ RenderController }
					config={this.props.config}
					map={this.state.map}
					extentLayer={this.state.extentLayer}
					wmsGroup={this.state.wmsGroup}
					drawBox={this.state.drawBox}
				/>
				<div id="map" style={{height: 400}}></div>
				<span className="fl_r">
					<button onClick={ e => this. onMapUpdate() }>Обновить</button>
				</span>
            </div>
        );
    }

    fitConfig(config){
		if (config) {
			let view = this.state.map.getView();
			view.fit(config.extent.split(','), this.state.map.getSize());
		}
	}

    setCurrentConfig(config){
    	this.state.config = config;
		this.onMapUpdate();
	}

    onMapUpdate(){
		let wmsGroup = this.state.wmsGroup;
		wmsGroup.getLayers().clear();
    	let config = this.state.config;
		if (config) {
			let params = RenderController.getSettingsFromOptions(config);
			let layersList = wmsGroup.getLayers();
			params.layersList.forEach(layers => {
				let layer = wmsGroup.getLayersArray().find(layer => layer.get('id') == layers);
				if (!layer) {
					layersList.push(new ol.layer.Tile({
						id: layers,
						source: new ol.source.TileWMS({
							url: '/ows/OWSForm?SERVICE=WMS',
							params: {
								LAYERS: layers,
								VERSION: "1.1.0",
								FORMAT: "image/png",
								CRS: params.crs,
								bank: params.bank
							},
							tileGrid: ol.tilegrid.createXYZ({tileSize: params.tileSize})
						})
					}));
				}
			});
		}
		this.updateExtents(this.state.configs);
	}

	updateExtents(configs){
		let extentLayer = this.state.extentLayer;
		let extentSource = extentLayer.getSource();

		extentSource.clear();
		extentSource.addFeatures(configs.map( (conf, index) => {
			return new ol.Feature({
				geometry: ol.geom.Polygon.fromExtent(conf.extent.split(',').map( item => parseFloat(item) )),
				id: index,
				active: this.state.config == conf
			});
		}));
	}

	addExtents(configs){
		let extentLayer = this.state.extentLayer;
		let extentSource = extentLayer.getSource();
		//extentSource.clear();
		extentSource.addFeatures(configs.map( (conf, index) => {

			return new ol.Feature({
				geometry: ol.geom.Polygon.fromExtent(conf.extent.split(',').map( item => parseFloat(item) )),
				id: index,
				active: this.state.config == conf
			});
		}));
	}

	removeExtents(configs){

	}

}


var settingsList = [
	{ id: 'layers', title: 'Слои', description: 'Список слоев. Через точку с запятой - группа  (прим. 1,2,3; 5,7; 9)', value: '1,2;3' },
	{ id: 'zooms', title: 'Масштабы', description: 'Масштабы для рендеринга. (прим. 1-3, 5, 7-20)', value: '1-15' },
	{ id: 'extent', title: 'Область карты', description: 'Зажмите Shift, чтобы нарисовать область на карте', value: '0,0,0,0' },
	{ id: 'tileSize', title: 'Размер тайла', description: 'По умолчанию 512,512', value: '512,512' },
	{ id: 'crs', title: 'Система координат', description: 'Система координат в формате "Геокад". (прим. -38)', value: '-38' },
	{ id: 'srs', title: 'Проекция', description: 'По умолчанию "EPSG:3857"', value: 'EPSG:3857' },
	{ id: 'bank', title: 'Идентификатор банка', description: 'Целочисленное значение', value: '2' },
];

let unknownCfgCounter = 0;

@observer
export class Settings extends Component {

    constructor(props){
        super(props);
        this.state = {
            started: false,
			configs: [],
			firstLoad: true
        };
    }

    setState(state, callback){
    	super.setState(state, callback);
		this.props.parent.setState({ configs: state.configs });
	}

    /*componentDidMount(){
		let drawBox = this.props.drawBox;
		drawBox.on('boxend', e => {
			var geom = e.target.getGeometry();
			var feature = new ol.Feature({
				geometry: geom
			});
			this.state.extentLayer.getSource().addFeature(feature);
			this.onUpdateConfig(this.refs.conf_select.value, { extent: geom.getExtent().join(',') });
		});
	}*/

    render(){

        var settings = settingsList.map( (setting, index) => {
            var {id, title, description, value} = setting;
            return [
                <tr>
                    <td>{title}</td>
                    <td>
						{id == 'extent' ?
							<div className="input-group">
								<input
									onChange={ e => this.onSettingChange(e, id) }
									type="text" key={id} ref={id} name={title}
									disabled={RenderController.started || !this.state.configs.length}
									placeholder={value} />
								<span className="input-group-addon">
									<a href="#" onClick={ e => this.extentFromMap(e) }>Карта</a>
								</span>
							</div>
							: <input
							onChange={ e => this.onSettingChange(e, id) }
							type="text" key={id} ref={id} name={title}
							disabled={RenderController.started || !this.state.configs.length}
							placeholder={value} /> }
					</td>
                </tr>,
                <tr>
                    <td> </td><td><div className="desc">{description}</div></td>
                </tr>
            ]
        });
        settings.push([<tr>
            <td> </td>
			<td>
				<span className="fl_r">
					<input onChange={ e => this.handleUpload(e) } type="file" hidden ref="config_file" className="hidden" multiple/>
					<button onClick={ e => this.onDeleteConfig(e) } disabled={RenderController.started || !this.state.configs.length}>Удалить</button>
					<button onClick={ e => this.onCreateConfig(e) } disabled={RenderController.started}>Создать</button>
					<button onClick={ e => this.refs.config_file.click() } disabled={RenderController.started}>Загрузить</button>
					<div className="btn-group">
						<button onClick={ e => this.handleSave(this.refs.conf_select.value) } disabled={RenderController.started || !this.state.configs.length}>Сохранить</button>
						<button onClick={ e => this.handleSave() } disabled={RenderController.started || (this.state.configs.length < 2)}>все</button>
					</div>
					<button onClick={ e => this.onStart(e, true) } className={!RenderController.started ? 'green' : 'red'} disabled={!this.state.configs.length} >
						{ !RenderController.started ? 'Старт' : 'Стоп' }
					</button>
				</span>
			</td>
        </tr>]);

		let configList = this.state.configs.map( (config, index) => {
			let {title} = config;
			return <option key={index} value={index}>{title}</option>
		});
		settings.unshift([
			<tr>
				<td>Конфигурация</td>
				<td>
					<div className="input-group">
						<select onChange={ e => this.onConfChange(this.refs.conf_select.value) } ref="conf_select" defaultValue="-1">
							{configList.length ? configList : <option value="-1" disabled>Нет доступных конфигураций</option>}
						</select>
						<span className="input-group-addon">
							<a href="#" onClick={ e => this.props.fitConfig() }>Карта</a>
						</span>
					</div>
				</td>
			</tr>,
			<tr>
				<td></td><td><div className="desc">Выбор конфигурации для просмотра и редактирования</div></td>
			</tr>
		]);

        return (
            <table className="settings_fields_table">
                <tbody>
                    {settings}
                </tbody>
            </table>
        );
    }

    onStart(e, stoppedByUser){
        e.preventDefault();

        if(!RenderController.started){
			RenderController.startRender(this.state.configs);
		}else{
            RenderController.stopRender(stoppedByUser);
        }

    }

	handleSave(index){
		if (this.state.configs.length) {
			let config = this.props.config;
			let setting = index ? this.state.configs[index] : this.state.configs;
			let fileName = setting.title || (prompt('Имя файла', 'config'));
			fileName && config.downloadFile(setting, fileName);
		} else {
			alert('Нет доступных для скачивания конфигураций!');
		}
	}

	handleUpload(e){
		let config = this.props.config;
		config.uploadFiles(e.target.files, configs => {
			let state = this.state;
			configs.forEach( conf => {
				if (Array.isArray(conf)) {
					state.configs.push(...conf);
				} else {
					state.configs.push(conf);
				}
			});
			this.setState(state);
			if(this.state.firstLoad){
				this.onConfChange(0);
				this.state.firstLoad = false;
			}
			this.props.updateExtents(state.configs);
		});
	}

	onConfChange(index){
		let config = this.state.configs[index];
		if (config) {
			for (let key in config) {
				if (config.hasOwnProperty(key)) {
					if (this.refs[key] && this.refs[key].type == 'text') {
						this.refs[key].value = config[key];
					}
				}
			}
			let extentLayer = this.props.extentLayer;
			let extentSource = extentLayer.getSource();
			extentSource.forEachFeature( feature => feature.set('active', index == feature.get('id')) );
		}
		this.setCurrentConfig(config);
	}

	onSettingChange(e, id){
		let field = this.refs[id];
		let config = this.state.configs[this.refs.conf_select.value];
		if (config) {
			config[id] = field.value;
		}
	}

	onDeleteConfig(e){
		let state = this.state;
		state.configs.splice(this.refs.conf_select.value, 1);
		state.firstLoad = state.configs.length <= 0;
		this.setState(state, e => {
			this.onConfChange(this.refs.conf_select.value);
			this.refs.conf_select.value = state.configs.length <= 0 ? '-1' : this.refs.conf_select.value;
			settingsList.forEach( setting => this.refs[setting.id].value = '' );
		});
	}

	onCreateConfig(e){
		let confName = prompt('Название конфигурации') || `Конфигурация без имени ${this.state.configs.length}`;
		let config = {};
		let current = this.state.configs[this.refs.conf_select.value];
		if(current){
			config = JSON.parse(JSON.stringify(current));
		}else{
			settingsList.forEach( setting => config[setting.id] = setting.value );

			let map = this.props.map;
			let view = map.getView();
			let extent = view.calculateExtent(map.getSize().map( item => item - 3));

			config.extent = extent.join(',');
		}
		config.title = confName;
		this.state.configs.push(config);
		let index = this.state.configs.indexOf(config);
		this.setState(this.state, e => {
			this.onConfChange(index);
			this.refs.conf_select.value = index;
		});
	}

	onUpdateConfig(index, params){
		let config = this.state.configs[index];
		Object.keys(params).forEach( key => config[key] = params[key] );
	}

	extentFromMap(e){
		e && e.preventDefault();

		if(RenderController.started){
			return;
		}

		let map = this.props.map;
		let view = map.getView();
		let extent = view.calculateExtent(map.getSize().map( item => item - 3));
		let config = this.state.configs[this.refs.conf_select.value];
		if (config) {
			config.extent = extent.join(',');
		}
		this.setState(this.state, e => {
			this.onConfChange(this.refs.conf_select.value);
		});
	}

	setCurrentConfig(config){
		return this.props.setCurrentConfig(config);
	}

}