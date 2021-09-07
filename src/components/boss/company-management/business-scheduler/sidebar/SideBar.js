import React from 'react';
import './sidebar.css';
import { 
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,

} from '@material-ui/icons'
import person from '../assets/person1.jpg'


const SideBar = ({employee_list}) => {
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Показать больше</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                {employee_list.list && employee_list.list.map((l, index) => 
                (
                    <li className="sidebarFriend" key={index}>
                        {l && l.boss === 1 ? 
                            (
                                null
                            )
                                :
                            (
                                <>
                                {l && l.profilePicture === "" ? 
                                    (<img 
                                    alt='person' 
                                    src={person}
                                    className='sidebarPerson'
                                    />)
                                        :
                                    (<img 
                                        alt='person' 
                                        src={l.profilePicture}
                                        className='sidebarPerson'
                                    />)
                                }
                                
                                <p className="text-center my-2 mx-2">{l.name}</p> 
                                </> 
                            )
                        }
                    </li>
                ))
            }
                </ul>
            </div>
        </div>
    )
}

export default SideBar
