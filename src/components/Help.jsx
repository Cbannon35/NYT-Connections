import React from 'react';

const unicode_arrow = '\u2197'

const Help = () => {
    return (
        <div className='flex flex-col gap-8 justify-center px-20 py-8 text-xl'>
            <p>This web app is based on <a href='https://www.nytimes.com/games/connections' target='_blank'><u>the NYT Connections game{unicode_arrow}</u></a></p>

            <p>Please leave any feedback you have <a href="https://forms.gle/xyo6d7Jnc9M75VxZ7" target='_blank'><u>here{unicode_arrow}</u></a></p>

            <p><a href="https://github.com/Cbannon35/NYT-Connections" target='_blank'><u>See the code{unicode_arrow}</u></a></p>
        </div>
    );
};

export default Help;