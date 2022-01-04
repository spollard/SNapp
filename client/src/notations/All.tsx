// To add a new notation, copy the Solfege file, rename the file, rename
// the exported variable, import it here, and add it to the list of notations here.

// ALSO add it to the list of Notation options in ../context/preferences.tsx.
// Ideally this would not be necessary, but I haven't figured out how to import
// stuff into ../context/preferences yet....


// Import your notation here
import Traditional from './Traditional';
import Simplified from './Simplified';
import Solfege from './Solfege';

// And add it here
let Notations = {
    Traditional,
    Simplified,
    Solfege,
};

export default Notations;
