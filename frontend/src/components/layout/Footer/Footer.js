// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import ViewListIcon from '@material-ui/icons/ViewList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// Own components
// Assets
// CSS
import './styles.css';

// Component NavBar
export default function Footer(props) {

    const { t, active } = props;
     
    return (
        <footer title='Petadoption' className='Footer'>
            <Container>
            { props.session && props.session.avatar &&
                <div className='Footer__Menu'>
                    <MenuItem className={`Footer__MenuItem ${active==='Home'?'Footer__MenuItem--active':''}`} component={Link} to='/'>
                        <HomeIcon fontSize='small' />
                        <span>{t('Home')}</span>
                    </MenuItem>
                    <MenuItem className={`Footer__MenuItem ${active==='published'?'Footer__MenuItem--active':''}`} component={Link} to={`/published/${props.session.login}`}>
                        <ViewListIcon fontSize='small' />
                        <span>{t('My adverts')}</span>
                    </MenuItem>
                    <MenuItem className={`Footer__MenuItem ${active==='history'?'Footer__MenuItem--active':''}`} component={Link} to='/history'>
                        <TrendingUpIcon fontSize='small' />
                        <span>{t('Sold History')}</span>
                    </MenuItem>
                    <MenuItem className={`Footer__MenuItem ${active==='favorites'?'Footer__MenuItem--active':''}`} component={Link} to='/favorites'>
                        <FavoriteIcon fontSize='small' />
                        <span>{t('Favorites')}</span>
                    </MenuItem>
                    <MenuItem className={`Footer__MenuItem ${active==='Chats'?'Footer__MenuItem--active':''}`} component={Link} to='/chats'>
                        <WhatsAppIcon fontSize='small' />
                        <span>{t('Chats')}</span>
                    </MenuItem>
                </div>
            }
            { ( !props.session || !props.session.avatar ) &&
                <div className='Footer__Content'>
                    <div className='SocialLinks'>
                        <a className='SocialLinks__link SocialLinks__link--facebook' href='a'><HomeIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--github' href='a'><GitHubIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--linkedin' href='a'><LinkedInIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--instagram' href='a'><InstagramIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--twitter' href='a'><TwitterIcon /></a>
                    </div>
                </div>
            }
            </Container>
        </footer>
    );
}