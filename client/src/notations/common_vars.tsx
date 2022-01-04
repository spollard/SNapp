import { StaffType } from '../parser/Types';
import { spacingPreferenceOption, scalePreferenceOption} from '../contexts/Preferences';



export type Wedge = {
    startMeasure: number,
    startTime: number,
    continuesFromLastRow: boolean,
    type: 'crescendo' | 'diminuendo'
} | undefined;

export enum Accidental {
    Flat = -1,
    Natural = 0,
    Sharp = 1
}

export const keySignatureNamesArrayMajor = [
    'Cb Major',  // -7
    'Gb Major',  // -6
    'Db Major',  // -5
    'Ab Major',  // -4
    'Eb Major',  // -3
    'Bb Major',  // -2
    'F Major',   // -1
    'C Major',   //  0
    'G Major',   //  1
    'D Major',   //  2
    'A Major',   //  3
    'E Major',   //  4
    'B Major',   //  5
    'F# Major',  //  6
    'C# Major'   //  7
];
export const keySignatureNamesArrayMinor = [
    'g# minor', // -7
    'eb minor', // -6
    'bb minor', // -5
    'f minor',  // -4
    'c minor',  // -3
    'g minor',  // -2
    'd minor',  // -1
    'a minor',  //  0
    'e minor',  //  1
    'b minor',  //  2
    'f# minor', //  3
    'c# minor', //  4
    'g# minor', //  5
    'd# minor', //  6
    'bb minor'  //  7
];


// Map preference strings to numeric values     21 June 2021 made all smaller
export const noteScaleMap: Record<scalePreferenceOption, number> = {
    small: 9,
    medium: 15,
    large: 22
};
export const staffScaleMap: Record<scalePreferenceOption, number> = {
    small: 18,
    medium: 25,
    large: 32
};
export const verticalSpacingMap: Record<spacingPreferenceOption, number> = {
    narrow: 10,
    moderate: 30,
    wide: 50
};
// 2020 08 31: changed values from 20, 40, 60
export const horizontalSpacingMap: Record<spacingPreferenceOption, number> = {
    narrow: 20,
    moderate: 60,
    wide: 100
};



//vertical spacing
export const verticalPadding = 30; //top/bottom padding




//general spacing
export const strokeWidth = 2;
export const tickSize = 7;


//vertical spacing
export const measureLabelSpace = 15; //space for measure labels

//horizontal spacing
export const octaveLabelSpace = measureLabelSpace; //space for octave labels
// let tieExtensionSpace = measureLabelSpace;


export const accidentalMap = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0].map(x => x === 1); // C, C#, D, D#, E, ...
export const noteMap = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];

export const minNote: Record<StaffType, number> = {
    treble: 128,
    bass: 128
};
export const maxNote: Record<StaffType, number> = {
    treble: -1,
    bass: -1
};


export const staffTypes: StaffType[] = ['treble', 'bass'];



