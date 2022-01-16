import React from 'react';
import MusicXML from 'musicxml-interfaces';
import { Score } from '../parser/Types';
import { keySignatureNamesArrayMajor, keySignatureNamesArrayMinor,
    verticalPadding,
    } from './common_vars'


// This wrapper pulls out the title and credits from the XML document, then passes
// on control to the wrapped notation function.


// This wrapper removes the xml and ref argument requirements, so that the
// musical notation function can have a smaller interface.
export function Wrapper(score: Score, width: number, xml: MusicXML.ScoreTimewise, ref: any, editMode: '' | 'fingerings'='', wrapped: Function) {

    // find the title and author
    let title = 'no title specified';
    try {
        title = xml.movementTitle;
        title = xml.work.workTitle;
    } catch (e) { }
    if (title === undefined) title = 'no title specified';

    let credits = findCredits(xml, title);

    // get key signature     21 June 2021  modified logic (don't examine title for "minor" anymore; display both Major/minor if mode parm not specified)
    let keyFifths = score.tracks[0].keySignatures[0].fifths;
    // The values for fifths range from -7 for Cb Major to +7 for C# Major.  So adjust index to names array by 7 to start at array offset 0
    let keySignatureDisplayed = keySignatureNamesArrayMajor[keyFifths + 7] + " / " + keySignatureNamesArrayMinor[keyFifths + 7];  // if no mode, default to major and indicate that with an asterisk

    let titleRowHeight = 80;
    if (title === 'no title specified') title = '';
    return (
        <div id="snview" ref={ref} style={{ userSelect: 'text', padding: verticalPadding }}>
            <div className={'snview-row snview-row-0'} style={{ textAlign: 'center' }}>
                <h1>{title}</h1>
                <div>
                    {score.tempo && `${score.tempo} bpm`} {keySignatureDisplayed}
                </div>
                {credits.forEach(c => <div>{c}</div>)}
            </div>
            {wrapped(score, width, editMode)}
        </div>
    );
}

export function findCredits(xml: MusicXML.ScoreTimewise, title:string): string[] {
    // retrieve all credits but skip any that match the previously found title
    let credits: string[] = [];
    if (xml.credits !== undefined) {
        let xcredits = xml.credits.filter(x => x.creditWords !== undefined && x.creditWords.length > 0).map(x => x.creditWords);
        xcredits.forEach(credit => {
            credit.forEach(words => {
                if (words.words != title) {
                    credits.push(words.words)
                }
            });
        });

    }
    return credits;
};

// This wrapper allows you to return a simple HTML string with the rendered
// notation, rather than JSX.
// Use it like this
//    return SimpleHTMLWrapper(score, width, xml, ref, editMode, FUNCTION_THAT_RETURNS_A_STRING)
// Note the FUNCTION_THAT_RETURNS_A_STRING must take the arguments score, width, and editMode.
export function SimpleHTMLWrapper(score: Score, width: number, xml: MusicXML.ScoreTimewise, ref: any,editMode: '' | 'fingerings'='', wrapped: Function) {
    return Wrapper(score, width, xml, ref, editMode,
        (score: Score, width: number, editMode: '' | 'fingerings'='') => {
            return (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: wrapped(score, width, editMode) }} />
                </div>
            );
        }
    )
}


