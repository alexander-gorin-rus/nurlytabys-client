import React from 'react';
import { 
    Search, 
    Person,
    Chat,
    Notifications 
} from '@material-ui/icons'
import personImg from '../assets/person3.jpeg'

const Topbar = () => {

    
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className="logo">
                    Нурлы Табыс
                </span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input 
                        className="searchInput"
                        placeholder="Поиск сотрудника или задания"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">
                        Домашняя
                    </span>
                    <span className="topbarLink">
                        Timeline
                    </span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">
                            1
                        </span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">
                            3
                        </span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">
                            1
                        </span>
                    </div>
                </div>

                <img 
                    src={personImg}
                    className="topbarImg"
                    alt="nurlytabys company" 
                />
            </div>
        </div>
    )
}

export default Topbar
