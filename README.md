# S.I.B (Simple is the Best)

## motivated / 기획 의도

고양이의 울음소리와 함께 달리는 프로젝트~! 회계는 난관에 부딪혔다... 돈관리가 귀찮은 회계는 급기야 자신이 배운 프로그래밍을 활용해서 최대한 덜 귀찮은 방법으로 회계일을 하기 위해서 꼼수를 쓰기 시작했다. 그리하여 팀원들을 모아 착취하여 프로젝트 명목 하에 자신의 이득을 취하고자 하는데.... Simple Is Best!!!!!!!!



## abstract / 서비스 요약

이 서비스는 단체의 회계를 맡고 있는 사람들을 위해 만들었습니다. 이 웹사이트를 통해 회계는 장부를 보다 편리하게 관리할 수 있습니다. 다음의 과정을 참고해주세요.

**만약 당신이 회계라면...**

1. 회원들은 정해진 양식에 따라 요금을 청구할 수 있습니다.
2. 요금 청구 페이지에서 내역을 확인해주세요.
3. 청구 내역을 확인해서 올바르다면 돈을 송금하시고, 청구 상태를 '승인 대기'에서 '승인'으로 바꿔주세요.
4. 모든 청구내역은 '요금 청구'페이지에서 확인할 수 있습니다.
5. 만약 수입이 있다면, '수입 입력' 페이지에서 작성하고 확인할 수 있습니다.
6. 수입과 지출 내역을 한 번에 확인하고 싶다면, '장부 확인' 페이지를 확인하세요. 기간을 설정하고 엑셀파일로도 다운받으실 수 있습니다.

**만약 당신이 회원이라면...**

1. 먼저 로그인한 후, 요금 청구 페이지로 가세요.
2. '요금 청구' 버튼을 클릭하세요. 버튼은 페이지의 하단에 있습니다.
3. 양식을 채워주세요. 만약 송금 완료 이메일을 받고 싶다면 Yes를 선택해주세요. 또한 해당 청구에 해당하는 영수증은 반드시 첨부해야 합니다.
4. 작성이 끝나면 업로드(Upload) 버튼을 클릭하고 조금만 기다려주세요! 회계가 확인하고 돈을 송금해 줄거예요.

------

The service is for people whose role is finance manager( in club or circle, etc. You can manage your account book easily with this website with following steps.

**If you are an accountant...**

1. Member of club can claim amount of money with other information in format.
2. Check the claim in 'Outcome Claim' page.
3. If the content of claim is right and reasonable, Send money to calimer and change the status from 'wait' to 'allowed'.
4. You can check all claims in 'Outcome claim' page.
5. If there is any income, you can make record and check all in 'Income record' page.
6. If you want to check income and outcome both, go to 'books' page. You can also select  term of dates and download contents with excel file in the page.

**If you are a member...**

1. After login, go to 'Outcome claim' page.
2. Click 'Claim' button. You can find it bottom of the page.
3. Fill all format. If you want to get email that alert all-process-done, select 'Yes'. You also have to attatch reciept related with the claim.
4. After all, click 'Upload' button and wait! Accountant will check your claim and send money to you.





## issues / 이슈

#### 2021.12.17.(FRIDAY)

- settings.py  all-auth로 인한, run server 불가

=> all-auth 부분만 주석 처리.

- 자유게시판 게시글 및 댓글(대댓글은 아직 미구현) CRUD RESTful 작성
- VUE 로그인 부분(JWT-Token 부분) 만 작성, setToken 부분을 Vuex 에서 보관하도록 구현.
- VUE 자유게시판 전체 게시글 pagination 구현 완료
- VUE Detail 에서 이미지 경로 및 영상 경로 수정.

