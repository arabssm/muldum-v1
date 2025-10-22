import * as _ from './style';
import Menu from '@_all/component/menu/menu';
import Slider from '@_all/component/Slide/Slide';
import '@_styles';
import { GetUser } from '@_api/user/data'
import { useEffect } from 'react';
import { getCookie } from '../../../utils/cookie';

export default function Main() {

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            GetUser();
        }
    }, []);
    return (
        <>
            <_.ContentItem>
                <Slider />
            </_.ContentItem>
            <_.ContentItem>
                <Menu />
            </_.ContentItem>
        </>
    )
}