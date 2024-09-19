import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './Styles/App.css';
import { ReactComponent as Display } from './assets/Display.svg';
import { ReactComponent as Down } from './assets/down.svg'
const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchData();
  }, []);


  // const generateMockData = () => {
  //   const users = [
  //     { id: "usr-1", name: "Anpoop Sharma", available: false },
  //     { id: "usr-2", name: "Yogesh", available: true },
  //     { id: "usr-3", name: "Shankar Kumar", available: true },
  //     { id: "usr-4", name: "Ramesh", available: true },
  //     { id: "usr-5", name: "Suresh", available: true },
  //     { id: "usr-6", name: "Neha", available: false },
  //     { id: "usr-7", name: "Ravi", available: true },
  //   ];
  
  //   const tickets = [
  //     { id: "CAM-1", title: "Update User Profile Page UI cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc", tag: ["Feature request"], userId: "usr-1", status: "Todo", priority: 4 },
  //     { id: "CAM-2", title: "Add Multi-Language Support", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 3 },
  //     { id: "CAM-3", title: "Optimize Database Queries", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 1 },
  //     { id: "CAM-4", title: "Implement Email Notification System", tag: ["Feature Request"], userId: "usr-1", status: "In progress", priority: 3 },
  //     { id: "CAM-5", title: "Enhance Search Functionality", tag: ["Feature Request"], userId: "usr-5", status: "In progress", priority: 0 },
  //     { id: "CAM-6", title: "Third-Party Payment Gateway", tag: ["Feature Request"], userId: "usr-2", status: "Todo", priority: 0},
  //     { id: "CAM-7", title: "Create Onboarding Tutorial", tag: ["Feature Request"], userId: "usr-1", status: "Done", priority: 4 },
  //     { id: "CAM-8", title: "Implement RBAC", tag: ["Feature Request"], userId: "usr-3", status: "In progress", priority: 3 },
  //     { id: "CAM-9", title: "Upgrade Server Infrastructure", tag: ["Feature Request"], userId: "usr-5", status: "Todo", priority: 2 },
  //     { id: "CAM-10", title: "Conduct Security Assessment", tag: ["Feature Request"], userId: "usr-4", status: "Backlog", priority: 1 },
  //     { id: "CAM-11", title: "Improve UI Accessibility", tag: ["Bug Fix"], userId: "usr-6", status: "Todo", priority: 4 },
  //     { id: "CAM-12", title: "Fix Mobile Responsiveness Issues", tag: ["Bug Fix"], userId: "usr-7", status: "In progress", priority: 2 },
  //     { id: "CAM-13", title: "Refactor Authentication Code", tag: ["Technical Debt"], userId: "usr-3", status: "Done", priority: 3 },
  //     { id: "CAM-14", title: "Update Documentation", tag: ["Maintenance"], userId: "usr-5", status: "Cancelled", priority: 1 },
  //     { id: "CAM-15", title: "Enhance API Rate Limiting", tag: ["Feature Request"], userId: "usr-4", status: "In progress", priority: 2 },
  //   ];
  //   const ticketsWithUsers = tickets.map(ticket => {
  //     // Find the user associated with the current ticket
  //     const user = users.find(user => user.id === ticket.userId);
  
  //     return {
  //       ...ticket,
  //       user: user ? user.name : 'Unknown', // User's name
  //       available: user ? user.available : false // User's availability
  //     };
  //   });
  
  //   return { tickets: ticketsWithUsers, users };
  // };


  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      
      const { tickets, users } = data;
  
      const ticketsWithUsers = tickets.map(ticket => {
        const user = users.find(user => user.id === ticket.userId);
  
        return {
          ...ticket,
          user: user ? user.name : 'Unknown',
          available: user ? user.available : false 
        };
      });
  
      setTickets(ticketsWithUsers);
      setUsers(users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  // const fetchData = async () => {
  //   try {
  //     // Use mock data instead of API call
  //     const data = generateMockData();
  //     setTickets(data.tickets);
  //     setUsers(data.users);
  //     console.log("Mock data loaded:", data); // Debug: Verify data is loaded correctly
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleGroupBy = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    }
    if (sortBy === 'title') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = (tickets) => {
    if (groupBy === 'status') {
      return tickets.reduce((acc, ticket) => {
        const { status } = ticket;
        acc[status] = acc[status] ? [...acc[status], ticket] : [ticket];
        return acc;
      }, {});
    }

    if (groupBy === 'user') {
      return tickets.reduce((acc, ticket) => {
        const { user } = ticket;
        acc[user] = acc[user] ? [...acc[user], ticket] : [ticket];
        return acc;
      }, {});
    }

    if (groupBy === 'priority') {
      return tickets.reduce((acc, ticket) => {
        const { priority } = ticket;
        acc[priority] = acc[priority] ? [...acc[priority], ticket] : [ticket];
        return acc;
      }, {});
    }

    return {};
  };

  const sortedAndGroupedTickets = groupedTickets(sortTickets(tickets));
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="App">
      <header className="header">
      <div className="display-button" style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '15px',
    }}>
      <button onClick={toggleDropdown} style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '5px',
        margin: '0',
        boxShadow: '0 3px 4px rgba(0, 0, 0, 0.3)'
      }}>
        <Display style={{ height: '15px', marginRight: '4px' }} />
        <span style={{
          fontSize: '12px',
          marginRight: '4px',
          color: 'black',
        }}>Display</span>
        <Down style={{ height: '15px' }} />
      </button>


        {isOpen && (
          <div className="dropdown-menu" style={{
            width:'250px',
            top:'25px',
            borderRadius: '5px',
            boxShadow: '0 3px 4px rgba(0, 0, 0, 0.3)' 
   
            }}>
            <div className="controls">
              <div style={{
                display:'flex',
                width:'100%',
                flexDirection:'flex-row',
                justifyContent: 'space-between',
             
              }}>
                <label style={{color:'gray'}}>Grouping</label>
                <select style={{alignItems: 'center',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '5px',
        margin: '0',
        borderRadius:'5px',
        border: '1px solid #c2c4c3',
        width:'120px',
        }}
        onChange={(event) => {
          handleGroupBy(event); 
          console.log('groupby:', event.target.value); 
        }}
      
         value={groupBy}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div style={{
                display:'flex',
                width:'100%',
                flexDirection:'flex-row',
                justifyContent: 'space-between',
              }}>

                <label style={{color:'gray'}}>Ordering</label>
                <select style={{alignItems: 'center',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '5px',
        margin: '0',
        borderRadius:'5px',
        border: '1px solid #c2c4c3',
        width:'120px',
        }} value={sortBy} onChange={handleSortBy}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
        </header>
      <KanbanBoard tickets={sortedAndGroupedTickets} groupBy={groupBy} />
    </div>
  );
};

export default App;
