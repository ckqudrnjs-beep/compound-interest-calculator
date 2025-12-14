document.getElementById('calculateBtn').addEventListener('click', calculateCompoundInterest);

function calculateCompoundInterest() {
    // 1. 입력 값 가져오기
    const P = parseFloat(document.getElementById('initialAmount').value); // 초기 투자금
    const D = parseFloat(document.getElementById('monthlyDeposit').value); // 월 적립액
    const r = parseFloat(document.getElementById('annualRate').value) / 100; // 연 수익률 (소수점)
    const T = parseInt(document.getElementById('years').value); // 투자 기간 (년)

    if (isNaN(P) || isNaN(D) || isNaN(r) || isNaN(T) || T <= 0) {
        alert('모든 필수 입력값을 정확히 입력해주세요.');
        return;
    }

    // 변수 초기화
    let currentBalance = P; // 현재 잔액을 초기 투자금으로 시작
    const totalMonths = T * 12; // 총 개월 수
    const monthlyRate = r / 12; // 월 이자율
    let totalPrincipal = P; // 총 투자 원금 (초기금 포함)

    // 테이블 초기화
    const tableBody = document.getElementById('growthTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // 이전 결과 삭제

    let finalAmount = 0;

    // 2. 월별 반복 계산 로직
    for (let month = 1; month <= totalMonths; month++) {
        // 매월 이자 계산 (현재 잔액 기준)
        const interest = currentBalance * monthlyRate;
        
        // 이자 반영 및 월 적립금 추가
        currentBalance += interest;
        currentBalance += D;

        // 월 적립금은 총 원금에 누적
        if (month <= totalMonths) {
            totalPrincipal += D;
        }

        // 1년(12개월) 단위로 테이블에 기록
        if (month % 12 === 0) {
            const year = month / 12;
            const totalInterest = currentBalance - totalPrincipal;
            
            const newRow = tableBody.insertRow();
            newRow.insertCell().textContent = year;
            newRow.insertCell().textContent = formatCurrency(totalPrincipal);
            newRow.insertCell().textContent = formatCurrency(currentBalance);
            newRow.insertCell().textContent = formatCurrency(totalInterest);
            
            finalAmount = currentBalance;
        }
    }
    
    // 3. 최종 요약 결과 출력
    const totalInterestFinal = finalAmount - totalPrincipal;
    
    document.getElementById('finalAmount').textContent = formatCurrency(finalAmount);
    document.getElementById('totalPrincipal').textContent = formatCurrency(totalPrincipal);
    document.getElementById('totalInterest').textContent = formatCurrency(totalInterestFinal);
}

// 화폐 형식으로 변환하는 헬퍼 함수
function formatCurrency(amount) {
    return Math.round(amount).toLocaleString('ko-KR') + '원';
}