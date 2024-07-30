import mobx, { observable, computed } from 'mobx';

import {ArrayUtils} from '../ArrayUtils';
import LoggerController from './LoggerController';


let renderController = null;

export class RenderController {

    @observable started = false;

    @observable settings = {};

    @observable configName = '';
    @observable configsCount = 0;
    @observable configsPassed = 0;

    @observable currentLayer = 0;
    @observable layersCount = 0;
    @observable layersPassed = 0;

    @observable currentZoom = 0;
    @observable zoomsCount = 0;
    @observable zoomsPassed = 0;

    @observable tilesCount = 0;
    @observable tilesPassed = 0;

    @observable lastHttpError = null;

    constructor(){
        if(renderController) return renderController;
        renderController = this;
    }

    reset(){
        this.settings = {};
        this.configName = '';
		this.configsCount = 0;
		this.configsPassed = 0;
        this.currentLayer = 0;
        this.layersCount = 0;
        this.layersPassed = 0;
        this.currentZoom = 0;
        this.zoomsCount = 0;
        this.zoomsPassed = 0;
        this.tilesCount = 0;
        this.tilesPassed = 0;
        this.lastHttpError = null;
    }

    @computed get state(){
        return this.started;
    }

    startRender(configList){
        this.reset();

        this.started = true;

        LoggerController.start();

		this.configsCount = configList.length;

		ArrayUtils.forEachAsync(configList, (config, next) => {
			let settings = this.getSettingsFromOptions(config);
			this.configName = config.title;
			this.settings = config;

			let tileGrid = ol.tilegrid.createForProjection(settings.srs, settings.zooms.maxZoom, settings.tileSize);

			this.layersCount = settings.layersList.length;
			this.layersPassed = 0;

			ArrayUtils.forEachAsync(settings.layersList, (layer, next) => {
				this.zoomsCount = settings.zooms.list.length;
				this.zoomsPassed = 0;
				this.currentLayer = layer;

				let zoomList = settings.zooms.list.slice();

				ArrayUtils.forEachAsync(zoomList, (zoom, next) => {

					let tileRange = tileGrid.getTileRangeForExtentAndZ(settings.extent, zoom);

					this.tilesCount = tileRange.getWidth() * tileRange.getHeight();
					this.tilesPassed = 0;
					this.currentZoom = zoom;

					ArrayUtils.asyncFor(tileRange.minX, tileRange.maxX, (x, next) => {
						ArrayUtils.asyncFor(tileRange.minY, tileRange.maxY, (y, next) => {
							if(this.started){
								var image = new Image();

								image.onload = e => {
									this.tilesPassed++;
									next();
								};
								image.onerror = e => {
									this.tilesPassed++;
									this.lastHttpError = e.target.src;
									next();
								};

								var tileExtent = tileGrid.getTileCoordExtent([zoom, x, y]);

								image.src = this.getTileUrl(tileExtent, layer, settings);
							}
						}, done => next() );
					}, done => {
						this.zoomsPassed++;
						next();
					});

				}, done => {
					this.layersPassed++;
					next();
				});

			}, done => {
				this.configsPassed++;
				next();
			});
		}, done => this.stopRender() );
    }

    stopRender(stoppedByUser){
        this.started = false;
        LoggerController.stop(stoppedByUser);
    }

    getSettingsFromOptions(options){

        return {
            layersList: ArrayUtils.fromString(options.layers, ';'),
            zooms: this.readZooms(options.zooms),
            extent: ArrayUtils.fromString(options.extent).map( item => parseInt(item) ),
            tileSize: ArrayUtils.fromString(options.tileSize).map( item => parseInt(item) ),
            crs: options.crs.trim(),
            srs: options.srs.trim(),
            bank: options.bank.trim(),
        }
    }

    readZooms(value){
        let parts = ArrayUtils.fromString(value);
        let zoomList = [];
        parts.forEach( part => {
            let [start, end] = ArrayUtils.fromString(part, '-');
            let list = ArrayUtils.createArrayFromInterval(start, end);
            list.forEach( item => {
                if(zoomList.indexOf(item) < 0) {
                    zoomList.push(parseInt(item));
                }
            });
        });
        return {
            list: zoomList.sort( (a, b) => {
                if(a > b) return 1;
                if(a < b) return -1;
                if(a == b) return 0;
            }),
            minZoom: zoomList.reduce( (prev, curr) => { return Math.min(prev, curr) }),
            maxZoom: zoomList.reduce( (prev, curr) => { return Math.max(prev, curr) })
        }
    }

    getTileUrl(extent, layer, settings){
        var tileSize = settings.tileSize;
        return [
            '/ows/OWSForm?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&STYLES=',
            'crs=' + settings.crs,
            'LAYERS=' + layer,
            'bank=' + settings.bank,
            'WIDTH=' + tileSize[0],
            'HEIGHT=' + tileSize[1],
            'SRS=' + settings.srs,
            'BBOX=' + extent
        ].join('&');
    }

}

export default new RenderController;