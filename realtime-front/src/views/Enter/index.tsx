import React, { ChangeEvent, KeyboardEvent, useRef } from 'react'
import './style.css';
import { usePathStore, useRoomStore } from '../../stores';

//          component: 방 접속 화면 컴포넌트          //
export default function Enter() {

  //          state: Enter Buttom Ref 상태          //
  const enterButtonRef = useRef<HTMLDivElement | null>(null);
  //          state: Path 상태 변경          //
  const { setPath } = usePathStore();
  //          state: Room 상태 및 변경 함수          //
  const { room, setRoom } = useRoomStore();

  //          event handler: Room 값 변경 처리          //
  const onRoomValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const room = event.target.value;
    setRoom(room);
  }
  //          event handler: 뒤로가기 버튼 클릭 처리          //
  const onBackButtonClickHandler = () => {
    setRoom('');
    setPath('/');
  }
  //          event handler: 접속 버튼 클릭 처리          //
  const onEnterButtonClickHandler = () => {
    if (!room) return;
    setPath('/room');
  }
  //          event handler: Enter Key 누름 처리          //
  const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!enterButtonRef.current) return;
    enterButtonRef.current.click();
  }

  //          render: 방 접속 화면 컴포넌트 랜더링          //
  return (
    <div id='enter-wrapper'>
      <div className='enter-back-button' onClick={onBackButtonClickHandler} >뒤로가기</div>
      <div className='enter-input-box'>
        <input className='enter-input' type='text' placeholder='방 번호를 입력하세요' value={room} onChange={onRoomValueChangeHandler} onKeyDown={onEnterKeyDownHandler} />
        <div ref={enterButtonRef} className='enter-button' onClick={onEnterButtonClickHandler} >들어가기</div>
      </div>
    </div>
  )
}
