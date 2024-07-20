import { useContext} from 'react'
import { WorkoutsContext } from '../context/WorkoutsContext'


export function useWorkoutsContext() {
    const context = useContext(WorkoutsContext);
    if (!context){
        throw  Error('useWorkoutsContext must be used inside a WorkoutContextProvider')
    }
  return context;
}


