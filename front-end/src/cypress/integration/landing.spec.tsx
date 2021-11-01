export {};

describe('테스트 코드 작성중', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForReact();
  });

  it('메인페이지 UI 확인', () => {
    cy.react('LandingTemplate').should('have.length', '1');
    cy.react('MainHeader').should('have.length', '1');
    cy.react('CreateStudyBtn').should('have.length', '1');
  });

  it('헤더 로그인 버튼 클릭 시 모달 오픈', () => {
    cy.contains('로그인').click();
    cy.react('LoginModal').should('have.length', '1');
  });
});

describe('로그인 폼 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForReact();
  });

  it('이메일 형식에 안맞는 이메일 타이핑', () => {
    cy.contains('로그인').click();
    cy.get('input[type="email"]').type('1');
    cy.get('div[role="alert"]').eq(0).should('have.text', '이메일 형식이 올바르지 않습니다.');
    cy.get('input[type="email"]').type('123@naver.com2');
    cy.get('div[role="alert"]').eq(0).should('have.text', '이메일 형식이 올바르지 않습니다.');
  });

  it('아무것도 입력 안할 때', () => {
    cy.contains('로그인').click();
    cy.get('form').submit();
    cy.get('div[role="alert"]').should(($div) => {
      expect($div).to.have.length(2);
      expect($div.eq(0)).to.contain('이메일은 필수 항목입니다.');
      expect($div.eq(1)).to.contain('비밀번호을 입력해주세요.');
    });
  });
});
