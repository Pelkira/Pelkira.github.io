const imageConfigs = {
    haven_atk: {
        src: "maps/Haven_atk.png",
        arrows: [
            {fromx: 906, fromy: 475, tox: 680, toy: 630, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'Sova', skill: 'Sova-E', hoverImage: 'arrows/haven/sova/000.jpg'},
        ],
        agents: ['Sova']
    },
    haven_def: {
        src: "maps/Haven_def.png",
        arrows: [
			{fromx: 118, fromy: 549, tox: 344, toy: 394, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'Sova', skill: 'Sova-E', hoverImage: 'arrows/haven/sova/000.jpg'},
            {fromx: 50, fromy: 100, tox: 200, toy: 100, url: 'https://example.org', agent: 'Sova', skill: 'Sova-Q', hoverImage: 'path/to/hover_image2.jpg'},
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'Viper', skill: 'Viper-C', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['Sova', 'Viper']
    },
    image3: {
        src: "path/to/image3.jpg",
        arrows: [
            {fromx: 50, fromy: 50, tox: 250, toy: 250, url: 'https://example.info'},
            {fromx: 300, fromy: 300, tox: 500, toy: 200, url: 'https://example.biz'}
        ]
    }
};

const agentIcons = {
    'Sova': 'agents/sova.png',
    'Viper': 'agents/viper.png',
};

const skillColors = {
    'Sova-Q': '#69b4FF',
    'Sova-E': '#FFa040',
    'Viper-C': '#69FFb4',
};