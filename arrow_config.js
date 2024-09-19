const imageConfigs = {
    haven_atk: {
        src: "maps/Haven_atk.png",
        arrows: [
            {fromx: 906, fromy: 475, tox: 680, toy: 630, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'Sova', key: 'E', hoverImage: 'arrows/haven/sova/000.jpg'},
        ],
        agents: ['Sova']
    },
    haven_def: {
        src: "maps/Haven_def.png",
        arrows: [
            {fromx: 118, fromy: 549, tox: 344, toy: 394, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'Sova', key: 'E', hoverImage: 'arrows/haven/sova/000.jpg'},
            {fromx: 50, fromy: 100, tox: 200, toy: 100, url: 'https://example.org', agent: 'Sova', key: 'Q', hoverImage: 'path/to/hover_image2.jpg'},
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'Viper', key: 'C', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['Sova', 'Viper']
    },
    bind_atk: {
        src: "maps/Bind_atk.png",
        arrows: [
            {fromx: 118, fromy: 549, tox: 344, toy: 394, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'Sova', key: 'E', hoverImage: 'arrows/haven/sova/000.jpg'},
            {fromx: 50, fromy: 100, tox: 200, toy: 100, url: 'https://example.org', agent: 'Sova', key: 'Q', hoverImage: 'path/to/hover_image2.jpg'},
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'Viper', key: 'C', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['Viper']
    },
    bind_def: {
        src: "maps/Bind_def.png",
        arrows: [
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'Viper', key: 'C', hoverImage: 'path/to/hover_image3.jpg'},
            {fromx: 50, fromy: 200, tox: 200, toy: 200, url: 'https://example.net', agent: 'Viper', key: 'Q', hoverImage: 'path/to/hover_image3.jpg'},
            {fromx: 50, fromy: 250, tox: 200, toy: 250, url: 'https://example.net', agent: 'Viper', key: 'E', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['Viper']
    }
};

const agentIcons = {
    'Sova': 'agents/sova.png',
    'Viper': 'agents/viper.png',
};

const skillColors = {
    'Sova': {
        'Q': '#69b4FF',
        'E': '#FFa040',
    },
    'Viper':{
        'C': '#bcffb4',
        'Q': '#69FFb4',
        'E': '#78ff69',
    }
};

const skillData = {
    'Sova': {
        'Q': {
            color: '#69b4FF',
            icon: 'skills/Sova-Q.png'
        },
        'E': {
            color: '#FFa040',
            icon: 'skills/Sova-E.png'
        }
    },
    'Viper': {
        'C': {
            color: '#bcffb4',
            icon: 'skills/Viper-C.png'
        },
        'Q': {
            color: '#69FFb4',
            icon: 'skills/Viper-Q.png'
        },
        'E': {
            color: '#78ff69',
            icon: 'skills/Viper-E.png'
        }
    }
}