# Django RESTful API

## 여기서 난 뭘 알아야 하는가?

- API가 뭔지
- 그럼 또 RESTful API는 뭔지
- 클라이언트의 요청부터 시작해서 데이터/정보의 흐름이 어떻게 흘러가는지



## API

- Application Programming Interface
- 응용 프로그래밍 인터페이스
- 이게 뭔말인가 싶지?



내가 알아듣기 쉬운 말로 하자면...

| 인터페이스 |      도구      |
| :--------: | :------------: |
|    CLI     |     명령줄     |
|    GUI     | 그래픽(아이콘) |
|    API     |   프로그래밍   |

인터페이스에 이런 종류들이 있는데, CLI는 명령어를 통해서 소통하는 거고, GUI는 그래픽, 그러니까 아이콘을 클릭하는 등의 행위를 통해서 의사를 전달하고 소통하는 거고, API는 프로그래밍 언어를 통해서 APP와 소통하고자 하는 것!!!



다시,

- 어플이든 클라이언트든 정보 달라고 요청을 보낼거임.
- 그러니까 프로그래밍 언어를 이용해 요청을 보내는 것이지...
- 그럼 API 서버에서는 JSON 형태로 응답을 해주는 것!!!

대충 이런 느낌적인 느낌으로 이해하면 되지 않을까...



## REST

- 방법론
- 어떤 방법론이냐면
- API Server를 개발하기 위한 일종의 소프트웨어 방법론!



즉, 'API 제공자'의 입장이 되어서, 어떻게 직관적(?)으로 API를 제공할 것인가? 하는 거임



## JSON

- JavaScript Object Notation
- 자바스크립트 객체 표기법
- 자바 스크립트의 표기법을 따른 단순 문자열
  - 사람이 읽거나 쓰기 쉽다
  - 기계도 파싱(해석, 분석)하고 만드어내기 쉽다
  - key-value 형태로 되어있어서 Python의 Dictionary나 JavaScript의 Object처럼  C 계열의 언어가 갖고 있는 자료구조로 나타내기 쉽다!



## REST의 자원과 주소의 지정 방법

1. 자원 : URI
2. 행위 : HTTP Method (GET, POST, PUT, DELETE 등)
3. 표현 : 자원과 행위를 통해 궁극적으로 표현되는 (추상화 된) 결과물로, JSON으로 표현된 데이터를 제공함



요거 설명 좀 더 해줄게 미래의 나 자신...

- 자원이 어디있냐? 자원이 있는 곳의 위치를 어떻게 표시할 거냐? 그걸 URI(URN or URL)로 표시하겠다는 거.
- 그 자원이 하는 행위를 HTTP 메서드를 통해서 나타내겠다고. 이게 뭔 마이냐? 네가 데이터를 가지고 어떻게 하겠냐고 묻는 거임. 그냥 가져올 거니? 어디 담아서 가져올 거니? 아니면 내보낼 거니? 지울 거니?
- 여튼 그런 데이터들은 JSON형태로 표현된다구...



자 그럼 API를 받아오는 입장 말고, 제공하는 입장에서 RESTful한 API를 만들어보자꾸나.(Django에서!)

1. url(urls.py) 확인

2. model(models.py) 확인 + 경우에 따라 serializer(serializers.py) 확인

3. Response 방식 정하기 : 나는 명령어(?) 기준으로 정리를 해보았다. 그렇지만 정리는 하기 나름이다.

   - render : html을 응답하는 서버 만들 때

   - JsonResponse : JSON 응답할 때

     - dict 이외의 객체를 직렬화(serialization)하려면 "safe" parameter를 False로 설정해야 함
     - 필드를 개별적으로 만들어줘야 했나봄????????

   - HttpResponse : Django serializer 이용해서 JSON 응답 보낼 때

     - 주어진 모델 정보를 활용하기 때문에 이전과 달리 필드를 개별적으로 직접 만들어 줄 필요 없음

   - Response : Django REST Framework(DRF) 라이브러리를 이용해서 JSON 응답 보낼 때(약간 최종보스같은 느낌)

     - ```
       $ pip install djangorestframework
       # 띄어쓰기 하나 없이 명령어를 치다니...
       ```

     - ```python
       # settings.py
       INSTALLED_APPS = [
           ...
           'rest_framework',
       ]
       ```

     - DRF의 Response()를 활용해 Serialize 된 JSON 객체 응답

       ```python
       from rest_framework.decorators import api_view
       from rest_framework.response import Response
       from .serializers import ArticleSerializer
       
       # @api_view(['GET'])
       def json3(request):
           articles = Article.objects.all()
           serializer = ArticleSerializer(articles, many=True)
           return Response(serializer.data)
       ```

     - DRF 라이브러리를 사용한 JSON 응답 확인

     - python 파일을 통해 직접 요청 보낸 후 응답 확인해보기(requests 라이브러리 활용





잠깐!!!!!!

그래서 DRF는 뭐고, Serializer는 뭔데??



### Django REST Framework(DRF)

- Web API 구축을 위한 강력한 Toolkit을 제공하는 라이브러리
- DRF의 Serializer는 Django의 Form 및 Model Form 클래스와 매우 유사하게  구성되고 작동함
- Web API : 웹 애플리케이션 개발에서 다른 서비스에 요청을 보내고 응답을 받기 위해 정의된 명세

### Serializer

- 데이터를 직렬화해주는것.... 호호...



자... 쉽게 생각해보자.

- Django는 HTML을 응답하고, DRF는 JSON을 응답하는 것이다...

- Django는 필터로 ModelForm을 쓰고, DRF는 serializers를 쓴다.
- 내 머릿속에서..... 폼이나 시리얼라이저는 뭔가 걸러주는 '체'같은 역할을 한다.





