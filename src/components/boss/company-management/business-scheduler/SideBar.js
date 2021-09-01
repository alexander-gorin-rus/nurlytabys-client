import React from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
            <Avatar src='https://www.w3schools.com/howto/img_avatar.png' />
                <div className='sidebar-header-right'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar-search'>
                <div className='sidebar-search-container'>
                    <SearchOutlined />
                    <input
                        type='text' 
                        placeholder='Поиск чата'
                    />
                </div>
            </div>
            <div className='sidebar-chats'>
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default SideBar
