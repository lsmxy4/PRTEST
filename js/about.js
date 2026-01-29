document.addEventListener('DOMContentLoaded', () => {
    
    const targetParagraph = document.querySelector('.text-body p:first-child');
    
    if (targetParagraph) {
        const originalText = targetParagraph.innerText; 
        targetParagraph.innerText = ''; 
        
        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('typing-cursor');

        function typeWriter(text, element, speed, callback) {
            let i = 0;

            if(element.contains(cursorSpan)) element.removeChild(cursorSpan);

            function type() {
                if (i < text.length) {
                    let char = text.charAt(i);

                    element.innerHTML += char === '\n' ? '<br>' : char;
                    i++;
                    setTimeout(type, speed);
                } else {

                    element.appendChild(cursorSpan);
                    if (callback) callback();
                }
            }
            type();
        }

        const splitIndex = originalText.indexOf('\n'); 
        const titleText = splitIndex !== -1 ? originalText.substring(0, splitIndex) : "프로젝트 소개";
        const contentText = splitIndex !== -1 ? originalText.substring(splitIndex + 1) : originalText;

        typeWriter(titleText + "\n", targetParagraph, 40, () => {

            typeWriter(contentText, targetParagraph, 15, () => {
                console.log("타이핑 효과 완료");
            });
        });
    }

    const modalHTML = `
        <div class="modal-overlay" id="memberModal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3 class="modal-name"></h3>
                <span class="modal-role"></span>
                <p class="modal-desc"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('memberModal');
    const closeBtn = modal.querySelector('.modal-close');
    const modalName = modal.querySelector('.modal-name');
    const modalRole = modal.querySelector('.modal-role');
    const modalDesc = modal.querySelector('.modal-desc');

    const cards = document.querySelectorAll('.role-card');

    const memberDetails = {
        "Leader": "팀을 이끄는 리더로서 프로젝트의 전체적인 방향성을 잡고, 백엔드 아키텍처를 설계했습니다.",
        "Member": "사용자 경험(UX)을 최우선으로 생각하며, 직관적이고 아름다운 인터페이스를 구현했습니다."
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {

            const nameText = card.querySelector('h4').innerText;
            const roleText = card.querySelector('.role-badge').innerText;
            
            modalName.innerText = nameText;
            modalRole.innerText = roleText;
            modalDesc.innerText = memberDetails[roleText] || "열정적으로 프로젝트에 참여한 팀원입니다.";
            
            modal.classList.add('open');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
        }
    });

});