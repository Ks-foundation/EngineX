function gotoxy(x, y) {
            document.getElementById('output').style.position = 'absolute';
            document.getElementById('output').style.left = x + 'px';
            document.getElementById('output').style.top = y + 'px';
        }

        function print(text) {
            document.getElementById('output').textContent += text;
        }

        // ANSI 색상 코드 정의
        const ANSI_COLOR = {
            'black': '\x1b[30m',
            'red': '\x1b[31m',
            'green': '\x1b[32m',
            'yellow': '\x1b[33m',
            'blue': '\x1b[34m',
            'magenta': '\x1b[35m',
            'cyan': '\x1b[36m',
            'white': '\x1b[37m',
            'reset': '\x1b[0m'
        };

        // 특정 색으로 텍스트 출력 함수
        function colorPrint(text, color) {
            print(ANSI_COLOR[color] + text + ANSI_COLOR['reset']);
        }
