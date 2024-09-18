import React from 'react';
import TicketCard from './TicketCard';
import '../Styles/Kanban.css' ;
import {StatusIcons, priorityIcons} from '../config';
import {ReactComponent as ThreeDotMenu} from "../assets/3dotmenu.svg";
import { ReactComponent as Plus} from "../assets/add.svg";
const priorityLabels = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  };

  


const KanbanBoard = ({ tickets, groupBy }) => {
  const groupTitles = {
    status: ['Backlog','Todo', 'In progress','Done','Cancelled'],
    priority: Object.keys(priorityLabels), // Use numerical keys to get labels
    user: Object.keys(tickets), // Dynamic based on user names
  };
    const getPriorityLabel = (priority) => priorityLabels[priority] || 'Unknown';

    const getIconForGroup = (group, groupBy) => {
      if (groupBy === 'priority') {
        return priorityIcons[group] || null;
      } else if (groupBy === 'status') {
        return StatusIcons[group] || null;
      }
      return null;
    };

    const formatUserName = (group) => {
      const names = group.split(' ');
      const initials = names.map(n => n[0]).join('').toUpperCase();
      return `${initials}`;
    };    

    console.log(tickets);
    
    return (
    <div className="kanban-board">
      {groupTitles[groupBy].map((group) => (
        <div key={group} className="kanban-column">
          <div className='kanban-header'>
          <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          {getIconForGroup(group, groupBy)}
          {groupBy === 'user' && (
                <div style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                  <span
                    className="profile-picture"
                    style={{
                      height: '25px',
                      width: '25px',
                      backgroundColor: 'black',
                      display: 'inline-block',
                      borderRadius: '50%',
                    }}
                  >
                  {formatUserName(group)}
                  
                  </span>
               </div>
              )}
        <h2 style={{marginLeft:'10px'}}>{groupBy === 'priority' ? getPriorityLabel(group) : group}</h2>
        <span style={{color:'gray' , marginLeft:'15px'}}> {tickets[group] ? `${tickets[group].length}` : ' 0'}
        </span>
          </div>
          <div><ThreeDotMenu style={{marginRight:'10px'}} /><Plus /></div>
          </div>
          <div className="tickets-container">
            {tickets[group]?.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} groupBy={groupBy} />
            )) || <p>No tickets</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
