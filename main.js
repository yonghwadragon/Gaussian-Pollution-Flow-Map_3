// main.js

document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 참조
    const pollutantSelect = document.getElementById('pollutant-select');
    const topGraphTitle = document.getElementById('top-graph-title');
    const topViewImage = document.getElementById('top-view-image');
    const sideGraphTitle = document.getElementById('side-graph-title');
    const sideViewImage = document.getElementById('side-view-image');
    const currentTimeSpan = document.getElementById('current-time');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const timeIndicator = document.querySelector('.time-indicator');

    const totalHours = 24;
    let currentHour = 1;
    let isPlaying = false;
    const intervalTime = 1000; // 1초
    let intervalId;

    let currentPollutant = pollutantSelect.value;

    // 업데이트 함수
    function updateImages() {
        const hourString = String(currentHour).padStart(2, '0');
        // 위에서 본 그래프 업데이트
        topViewImage.src = `UP_${currentPollutant}/plot_11-01-${hourString}.png`;
        topGraphTitle.textContent = `${currentPollutant.toUpperCase()} 위에서 본 그래프`;

        // 옆에서 본 그래프 업데이트
        sideViewImage.src = `SIDE_${currentPollutant}/plot_11-01-${hourString}.png`;
        sideGraphTitle.textContent = `${currentPollutant.toUpperCase()} 옆에서 본 그래프`;

        // 현재 시간 업데이트
        currentTimeSpan.textContent = `${currentHour}시`;

        // 툴팁 업데이트
        topViewImage.title = `${currentPollutant.toUpperCase()}의 위에서 본 확산 상태`;
        sideViewImage.title = `${currentPollutant.toUpperCase()}의 옆에서 본 확산 상태`;
    }

    // 다음 시간으로 이동
    function nextHour() {
        currentHour = currentHour < totalHours ? currentHour + 1 : 1;
        updateImages();
    }

    // 이전 시간으로 이동
    function prevHour() {
        currentHour = currentHour > 1 ? currentHour - 1 : totalHours;
        updateImages();
    }

    // 재생/일시정지 토글
    function togglePlayPause() {
        if (isPlaying) {
            clearInterval(intervalId);
            playPauseBtn.textContent = '재생';
        } else {
            intervalId = setInterval(nextHour, intervalTime);
            playPauseBtn.textContent = '일시정지';
        }
        isPlaying = !isPlaying;
    }

    // 오염물질 변경 시 처리
    function changePollutant() {
        currentPollutant = pollutantSelect.value;
        currentHour = 1; // 시간 초기화
        updateImages();
    }

    // 이벤트 리스너 설정
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', () => {
        nextHour();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextHour, intervalTime);
        }
    });
    prevBtn.addEventListener('click', () => {
        prevHour();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextHour, intervalTime);
        }
    });
    pollutantSelect.addEventListener('change', () => {
        changePollutant();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextHour, intervalTime);
        }
    });

    // 초기 업데이트
    updateImages();
});