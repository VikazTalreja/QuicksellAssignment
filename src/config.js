import {ReactComponent as LowPriority} from './assets/Img - Low Priority.svg';
import {ReactComponent as MediumPriority} from './assets/Img - Medium Priority.svg';
import {ReactComponent as HighPriority} from './assets/Img - High Priority.svg';
import {ReactComponent as UrgentPriority} from './assets/SVG - Urgent Priority colour.svg';
import {ReactComponent as Nopriority} from './assets/No-priority.svg';
import {ReactComponent as UrgentButDone} from './assets/SVG - Urgent Priority grey.svg'


import {ReactComponent as Backlog} from './assets/Backlog.svg';
import {ReactComponent as Cancelled} from './assets/Cancelled.svg';
import {ReactComponent as Done} from './assets/Done.svg';
import {ReactComponent as Inprogress} from './assets/in-progress.svg';
import { ReactComponent as Todo} from './assets/To-do.svg'

const priorityIcons = {
    0: <Nopriority />,
    1: <LowPriority />,
    2: <MediumPriority />,
    3: <HighPriority />,
    4: <UrgentPriority />,
    5:<UrgentButDone />
  };

const StatusIcons ={
    'Backlog': <Backlog />,
    'Cancelled': <Cancelled />,
    'Done': <Done />,
    'In progress':<Inprogress />,
    'Todo': <Todo />
};

export {priorityIcons,StatusIcons};