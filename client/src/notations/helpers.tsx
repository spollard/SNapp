import React from 'react';
import MusicXML from 'musicxml-interfaces';
import { Score } from '../parser/Types';
import { keySignatureNamesArrayMajor, keySignatureNamesArrayMinor,
    verticalPadding,
    } from './common_vars'

let creditsDisplay = ['', '', '', '', ''];

// This wrapper pulls out the title and credits from the XML document, then passes
// on control to the wrapped notation function.

// This wrapper removes the xml and ref argument requirements, so that the
// musical notation function can have a smaller interface.
export function Wrapper(score: Score, width: number, xml: MusicXML.ScoreTimewise, ref: any, editMode: '' | 'fingerings'='', wrapped: Function) {

    // find the title and author
    let title = 'no title specified';
    try {
        title = xml.movementTitle;
        console.log("Title:" + title);
        title = xml.work.workTitle;
    } catch (e) { }
    if (title === undefined) title = 'no title specified';
    console.log("Title:" + title);

    let findCredits = (): number => {
        // retrieve all credits but skip any that match the previously found title
        console.log("Credits display:" + creditsDisplay);
        let creditNum = 0;
        creditsDisplay = ['', '', '', '', ''];
        if (xml.credits !== undefined) {
            let credits = xml.credits.filter(x => x.creditWords !== undefined && x.creditWords.length > 0).map(x => x.creditWords);
            credits.forEach(credit => {
                credit.forEach(words => {
                    creditsDisplay[creditNum] = words.words;
                    //}
                    console.log("creditNum, creditsDisplay, words, title ", creditNum, creditsDisplay, words, title);
                    if (creditsDisplay[creditNum] === title) {
                        creditsDisplay[creditNum] = '';
                    }
                    else {
                        creditNum = creditNum + 1;
                    };
                    console.log("title, creditNum, creditsDisplay", title, creditNum, creditsDisplay);
                });
            });

        }
        return creditNum;
    };

    let numberOfCredits = findCredits();
    console.log("creditsDisplay, numberOfCredits", creditsDisplay, numberOfCredits);

    // get key signature     21 June 2021  modified logic (don't examine title for "minor" anymore; display both Major/minor if mode parm not specified)
    let keyFifths = score.tracks[0].keySignatures[0].fifths;
    // The values for fifths range from -7 for Cb Major to +7 for C# Major.  So adjust index to names array by 7 to start at array offset 0
    let keySignatureDisplayed = keySignatureNamesArrayMajor[keyFifths + 7] + " / " + keySignatureNamesArrayMinor[keyFifths + 7];  // if no mode, default to major and indicate that with an asterisk

    let titleRowHeight = 80;
    if (title === 'no title specified') title = '';
    return (
        <div id="snview" ref={ref} style={{ width: '100%', height: 'auto', overflow: 'hidden', minWidth: '350px', userSelect: 'text', paddingTop: verticalPadding, paddingBottom: verticalPadding }}>
            <div className={'snview-row snview-row-0'} style={{ textAlign: 'center' }}>
                <h1>{title}</h1>
                <div>
                    {score.tempo ? `${score.tempo} bpm` : null} {keySignatureDisplayed}
                </div>
                <div>
                    <div>{creditsDisplay[0]}</div>
                    <div>{creditsDisplay[1]}</div>
                    <div>{creditsDisplay[2]}</div>
                </div>
            </div>
            {wrapped(score, width, editMode)}
        </div>
    );
}
