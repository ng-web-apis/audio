import {AudioParamAutomationMode} from './audio-param-automation-mode';

export type AudioParamAutomation = {
    readonly value: number;
    readonly duration: number;
    readonly mode: AudioParamAutomationMode;
};
