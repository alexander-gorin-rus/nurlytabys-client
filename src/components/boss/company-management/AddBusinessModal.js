import React from 'react';
import Modal from 'react-modal';

const AddBusinessModal = ({
    isOpen, 
    onClose, 
    onEventAdded,
    onS
}) => {

     return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <form className="form mb-4" onSubmit={e => onSubmit(e)}>
                <div>
                    <input
                        type='text'
                        placeholder='Название дела'
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}
                    />
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder='Описание дела'
                            name='content'
                            value={content}
                            onChange={e => onChange(e)}
                        />
                        </div>
                            <div>
                                <label>Выбрать дату</label>
                                <input 
                                    type="date" 
                                    name='finish'
                                    value={finish}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                    <input type='submit' className='btn btn-primary' value='Отправить'/>
            </form>
        </Modal>
    )
}

export default AddBusinessModal;



