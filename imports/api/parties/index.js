//Now we want existing importations of the parties collection to stay the same, so we will make our parties dir export the parties collection whenever we import it by creating the following file:
import './publish';

export * from './collection';