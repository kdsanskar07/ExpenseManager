import React from 'react';
import styles from './OAuthButtons.module.css'
import GooleIcon from '../../../assets/google_icon.svg'
import GithubIcon from '../../../assets/github_icon.svg'
import TextWrapper from '../../UI/TextWrapper/TextWrapper';

function OAuthButtons(props) {
    const oAuthItem = [[GooleIcon, "Continue with Google"], [GithubIcon, "Continue with Github"]];

    return (
        <React.Fragment>
            <div className={styles.DirectAuthBox}>
                {
                    oAuthItem.map((item) => {
                        return (
                            <div className={styles.DirectAuth} key={item[1]}>
                                <div className={styles.DirectAuthImg}>
                                    <img src={item[0]} alt="DirectAuth Icon" />
                                </div>
                                <div className={styles.DirectAuthLabel}>
                                    <TextWrapper textLabel={item[1]} isFlexStart={true} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.OrBlock}>
                <div ></div>
                Or
                <div ></div>
            </div>
        </React.Fragment>
    );
}

export default OAuthButtons;