import Hls, { AbrController, BufferController, CapLevelController, FPSController, TimelineController } from "hls.js";
import type { PlayerInterface } from "./PlayerInterface";

export class HlsPlayer implements PlayerInterface {

    private hls: Hls;

    constructor() {
        this.hls = new Hls(this.config());
    }

    async play(videoElment: HTMLMediaElement, source: string): Promise<void> {
        this.hls.loadSource(source);
        this.hls.attachMedia(videoElment);
        this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            videoElment.play()
        })
    }

    private config(): object {
        return {
            autoStartLoad: true,
            startPosition: -1,
            debug: false,
            capLevelOnFPSDrop: false,
            capLevelToPlayerSize: false,
            defaultAudioCodec: undefined,
            initialLiveManifestSize: 1,
            maxBufferLength: 30,
            maxMaxBufferLength: 600,
            backBufferLength: Infinity,
            frontBufferFlushThreshold: Infinity,
            maxBufferSize: 60 * 1000 * 1000,
            maxBufferHole: 0.1,
            highBufferWatchdogPeriod: 2,
            nudgeOffset: 0.1,
            nudgeMaxRetry: 3,
            maxFragLookUpTolerance: 0.25,
            liveSyncDurationCount: 3,
            liveSyncOnStallIncrease: 1,
            liveMaxLatencyDurationCount: Infinity,
            liveDurationInfinity: false,
            preferManagedMediaSource: false,
            enableWorker: true,
            enableSoftwareAES: true,
            fragLoadPolicy: {
              default: {
                maxTimeToFirstByteMs: 9000,
                maxLoadTimeMs: 100000,
                timeoutRetry: {
                  maxNumRetry: 2,
                  retryDelayMs: 0,
                  maxRetryDelayMs: 0,
                },
                errorRetry: {
                  maxNumRetry: 5,
                  retryDelayMs: 3000,
                  maxRetryDelayMs: 15000,
                  backoff: 'linear',
                },
              },
            },
            startLevel: undefined,
            audioPreference: {
              characteristics: 'public.accessibility.describes-video',
            },
            subtitlePreference: {
              lang: 'en-US',
            },
            startFragPrefetch: false,
            testBandwidth: true,
            progressive: false,
            lowLatencyMode: true,
            fpsDroppedMonitoringPeriod: 5000,
            fpsDroppedMonitoringThreshold: 0.2,
            appendErrorMaxRetry: 3,
            abrController: AbrController,
            bufferController: BufferController,
            capLevelController: CapLevelController,
            fpsController: FPSController,
            timelineController: TimelineController,
            enableDateRangeMetadataCues: true,
            enableMetadataCues: true,
            enableID3MetadataCues: true,
            enableWebVTT: true,
            enableIMSC1: true,
            enableCEA708Captions: true,
            stretchShortVideoTrack: false,
            maxAudioFramesDrift: 1,
            forceKeyFrameOnDiscontinuity: true,
            abrEwmaFastLive: 3.0,
            abrEwmaSlowLive: 9.0,
            abrEwmaFastVoD: 3.0,
            abrEwmaSlowVoD: 9.0,
            abrEwmaDefaultEstimate: 500000,
            abrEwmaDefaultEstimateMax: 5000000,
            abrBandWidthFactor: 0.95,
            abrBandWidthUpFactor: 0.7,
            abrMaxWithRealBitrate: false,
            maxStarvationDelay: 4,
            maxLoadingDelay: 4,
            minAutoBitrate: 0,
            emeEnabled: false,
            licenseXhrSetup: undefined,
            drmSystems: {},
            drmSystemOptions: {},
            requestMediaKeySystemAccessFunc: MediaKeySystemAccess,
        };
    }
}