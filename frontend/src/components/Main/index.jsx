import React from 'react';
import Wrapper from './styles';

const Main = () => {

  return (
    <Wrapper>
      <div className="pfhd">
        <header className="pf">
          <div>
            <a href="/userId/" className="pf-box">
              <img alt="userId님의 프로필 사진" class="pf-img" src="/images/baseimg.jpg"></img>
            </a>
          </div>
          <div className="id0">
            <div className="id1">
              <div className="id2">
                <div className="id3">
                  <span className="id4">
                    <a href="/userId/" className="id5">User</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="btn0">
          <button className="btn0p" type="button">
            <div className="btn1">
              <div className="btn2">
                <svg aria-label="옵션 더 보기" className="menu0p" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#262626" color="#262626">
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              </div>
            </div>
          </button>          
        </div>
      </div>
      <div className="img0"> 
        <div role="button" className="img1" tabIndex="0">
          <div className="img2">
            <div className="img3">
              <img alt="upload-img" className="ulimg" src="/images/hallstatt.jpg"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="uc0">
        <div className="uc1">
          <div className="uc2">
            <section className="uc3">
              <span className="uc4">
                <button className="uc5" type="button">
                  <div className="uc6">
                    <svg aria-label="좋아요" className="li" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">                      
                    </svg>
                  </div>
                </button>
              </span>
            </section>
          </div>
        </div>

      </div>



    </Wrapper>
  ) 

}

export default Main;