import React from 'react';
import '../Styles/Ticketcard.css';
import {priorityIcons, StatusIcons} from '../config';

const TicketCard = ({ ticket , groupBy }) => {
  const priorityMap = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];


  const getIconForTicket = (ticket) => {
    if (ticket.status === 'Done' && ticket.priority == '4') {
      return priorityIcons[5]; 
    } else {
      return priorityIcons[ticket.priority] || null; 
    }
  };
  
  const formatUserName = (group) => {
    const names = group.split(' ');
    const initials = names.map(n => n[0]).join('').toUpperCase(); 
    return `${initials}`; 
  };

  return (
    <div className="ticket-card">
      <div style={{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        padding:'5',
      }}>
        <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
        }}>
          <span style={{
            color:'gray',
            fontSize:'12px'
          }}>{ticket.id}</span>
          {groupBy != "user" && (
          <div className="profile-container">
          <div className='profile-picture'>
          {formatUserName(ticket.user)}
          <span className={`${ticket.available ? 'online-indicator-online' : 'online-indicator-offline'}`}></span>
    
          </div>
          </div>
)}
        </div>
        <div style={{
           fontSize: '12px',
           justifyContent:'center',
           alignItems: 'center'
           }}>
       {groupBy != "status" && (
  <span style={{
    height: '3px',
    width: '3px',
    marginRight: '5px',
  }}>
    {StatusIcons[ticket.status]}
  </span>
)}      
{ticket.title.length > 50 ? `${ticket.title.substring(0, 50)}...` : ticket.title}
        </div>
        <div style={{
          display:'flex',
          flexDirection:'row',
          
        }}>
        {groupBy != "priority" && (
         <span style={{
          margin:'5px 5px 0px 0px',
          border:'2px solid rgba(128, 128, 128, 0.08)',
          borderRadius:'5px'
         }}>
            {getIconForTicket(ticket)}
          </span>
        )}
          <div className="tags-container">
  {ticket.tag && ticket.tag.map((tag, index) => (
    <div key={index} className="tag-item">
      <span
        className="profile-picture"
        style={{
          height: '6px',
          width: '6px',
          backgroundColor: 'gray',
          display: 'inline-block',
          borderRadius: '50%',
        }}
      >
      </span>
      <span style={{
        fontSize: '9px',
        color: 'gray',
        display: 'inline-block',
        marginLeft:'3px'
        }}>
        {tag}
      </span>
    </div>
  ))}
</div>
        </div>
      </div>
      </div>
  );
};

export default TicketCard;
