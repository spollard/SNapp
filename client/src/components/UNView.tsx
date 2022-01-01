import React, {useEffect, useState, useRef} from 'react';
// import {Note} from '@tonejs/midi/dist/Note';
import MusicXML from 'musicxml-interfaces';
import {parse} from '../parser/MusicXML';
import {Score} from '../parser/Types';
import TraditionalRender from '../notations/Traditional';
import SimplifiedRender from '../notations/Simplified';
import SolfegeRender from '../notations/Solfege';
import { usePreferencesState} from '../contexts/Preferences';
import {useDialogState} from '../contexts/Dialog';
import * as Dialog from '../util/Dialog';
import {navigate} from '@reach/router';


type Props = {
    xml: MusicXML.ScoreTimewise,
    forcedWidth?: number,
    editMode?: '' | 'fingerings',
    editCallback?: () => void, //called when the xml is edited
};


const UNView: React.FC<Props> = ({ xml, forcedWidth, editMode = '', editCallback = () => { } }) => {
    console.log("xml", xml);
    const ref = useRef(null! as HTMLDivElement);
    let [width, setWidth] = useState<number | undefined>(undefined);
    let [score, setScore] = useState<Score | undefined>(undefined);
    let [preferences,] = usePreferencesState();

    let [dialogState, setDialogState] = useDialogState();

    let showError = (error: string) => {
        setDialogState(Dialog.showMessage('An Error Occurred', error, 'Close', () => {
            navigate('/');
            setImmediate(() => setDialogState(Dialog.close()));
        }));
    };
    let showErrorRef = useRef(showError);

    console.log('Score:', score);
    useEffect(() => {
        if (forcedWidth === undefined) {
            let width: number = undefined!;
            let callback = () => {
                let newWidth = ref.current!.getBoundingClientRect().width;
                if (width !== newWidth) {
                    width = newWidth;
                    setWidth(newWidth);
                }
            };
            window.addEventListener("resize", callback);
            // let interval = setInterval(callback, 20);
            callback();
            return () => {
                window.removeEventListener("resize", callback);
                // clearInterval(interval);
            };
        } else {
            setWidth(forcedWidth);
        }
    }, [setWidth, forcedWidth]);

    useEffect(() => {
        // parse only when page loads, xml changes, or an edit occurs
        try {
            setScore(parse(xml));
        } catch (e) {
            showErrorRef.current('An issue was encountered while processing this file.');
            console.error(e);
        }
        // notify parent that xml has been modified so that it can be saved
        editCallback();

    }, [xml, (xml as any).revision]);

    if (score === undefined || width === undefined) { //skip first render when width is unknown or parsing is incomplete
        return <div ref={ref}></div>;
    }

    // Try catch is good for production
    //~ try {
        switch (preferences.notation) {
            case "Traditional":
                return TraditionalRender(score, width, xml, ref)
            case "Simplified":
                return SimplifiedRender(score, width, xml, ref)
            case "Solfege":
                return SolfegeRender(score, width, xml, ref)
            default:
                return (<div>I don't recognize your selected notation</div>)
        }


    //~ } catch (e) {
        //~ console.error(e);
        //~ if (!dialogState.shown) {
            //~ showError('An issue was encountered while generating WYSIWYP output for the selected file.');
        //~ }
        //~ return <div ref={ref}></div>;
    //~ }
};


export default UNView;
