import React from 'react'

const Modal = (props) => {
    const { onClose, title, children } = props;
    return (
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div className="flex justify-between items-center border-b mb-5 px-[30px] py-[10px]">
                    <div className='font-semibold'>{title}</div>
                    <div onClick={onClose} class="close">&times;</div>
                </div>
                <div className=''>{children}</div>
            </div>

        </div>
    )
}

export default Modal
