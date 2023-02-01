import React from 'react'
import styled from 'styled-components';

const Footer = () => {

    // style
    const FooterContainer = styled.div`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 40px 0;
        margin-top: 40px;
        border-top: 1px solid rgb(25, 25, 25);
        z-index: 100;

        @media (max-width: 768px) {
            padding: 20px 20px 30px;
        }
    `;

    const FooterContent = styled.div``;

    const FooterLinkContainer = styled.div`
        width: 500px;

        @media (max-width: 768px) {
            width: 100%;
        }
    `;
    
    const FooterLinkTitle = styled.h1`
        color: gray;
        font-size: 17px;
    `;

    const FooterLinkContent = styled.div`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 35px;

        @media (max-width: 768px) {
            margin-top: 26px;
        }
    `;

    const FooterLink = styled.a`
        width: 110px;
        margin-bottom: 21px;
        color: gray;
        font-size: 14px;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            margin-bottom: 16px;
        }
    `;

    const FooterDescContainer = styled.div`
        margin-top: 30px;

        @media (max-width: 768px) {
            margin-top: 20px;
        }
    `;

    const FooterDescRights = styled.h2`
        color: white;
        font-size: 14px;
        text-align: center;
    `;

    return (
        <FooterContainer>
            <FooterContent>
                <FooterLinkContainer>
                    <FooterLinkTitle>
                        넷플릭스 대한민국
                    </FooterLinkTitle>
                    <FooterLinkContent>
                        <FooterLink href="#">넷플릭스 소개</FooterLink>
                        <FooterLink href="#">고객 센터</FooterLink>
                        <FooterLink href="#">미디어 센터</FooterLink>
                        <FooterLink href="#">이용 약관</FooterLink>
                    </FooterLinkContent>
                    <FooterDescContainer>
                        <FooterDescRights>
                            Netflix Rights Reserved.
                        </FooterDescRights>
                    </FooterDescContainer>
                </FooterLinkContainer>
            </FooterContent>
        </FooterContainer>
    )
}

export default Footer
