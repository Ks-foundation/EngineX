// kpad 엔진 클래스 정의
class Kpad {
  constructor() {
    this.buffer = ""; // 입력을 저장하는 버퍼
    this.onInput = null; // 입력 이벤트 콜백
    this.onEnter = null; // 엔터 이벤트 콜백
    
    // 마우스 이벤트 리스너 등록
    document.addEventListener("click", (event) => {
      const key = this.getKeyFromPosition(event.clientX, event.clientY);
      if (key) {
        this.touchInput(key);
      }
    });
  }

  // 마우스 클릭 위치에 따라 버튼을 확인하고 해당하는 키를 반환
  getKeyFromPosition(x, y) {
    const buttons = document.querySelectorAll(".key");
    for (let i = 0; i < buttons.length; i++) {
      const rect = buttons[i].getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return buttons[i].innerText;
      }
    }
    return null;
  }

  // 터치 입력 처리
  touchInput(key) {
    if (key === "del") {
      // 삭제 키 처리
      this.buffer = this.buffer.slice(0, -1);
    } else if (key === "enter") {
      // 엔터 키 처리
      if (this.onEnter) {
        this.onEnter(this.buffer); // 엔터 콜백 호출
      }
      this.buffer = ""; // 버퍼 비우기
    } else {
      // 숫자나 문자 입력 처리
      this.buffer += key;
    }
    if (this.onInput) {
      this.onInput(this.buffer); // 입력 콜백 호출
    }
  }
}

// kpad 인스턴스 생성
const kpad = new Kpad();

// 예시: 입력 콜백 설정 및 테스트
kpad.onInput = function(input) {
  console.log("Input:", input); // 입력된 값 콘솔에 출력
};

// 예시: 엔터 콜백 설정 및 테스트
kpad.onEnter = function(input) {
  console.log("Entered:", input); // 입력된 값 콘솔에 출력
};
