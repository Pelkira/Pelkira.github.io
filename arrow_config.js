const imageConfigs = {
    haven_atk: {
        src: "maps/Haven_atk.png",
        arrows: [
            {fromx: 50, fromy: 50, tox: 200, toy: 50, url: 'https://example.com', agent: 'Sova', skill: 'Sova-E', hoverImage: 'Agents/sova.png'},
            {fromx: 50, fromy: 100, tox: 200, toy: 100, url: 'https://example.org', agent: 'Sova', skill: 'Sova-Q', hoverImage: 'Agents/viper.png'},
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'Viper', skill: 'Viper-C', hoverImage: 'Agents/viper.png'},
            {fromx: 300, fromy: 600, tox: 800, toy: 300, url: 'https://example.net', agent: 'Viper', skill: 'Viper-C', hoverImage: 'Agents/viper.png'}
        ],
        agents: ['Sova', 'Viper', 'Viper2', 'Viper3','Viper4']
    },
    haven_def: {
        src: "maps/Haven_def.png",
        arrows: [
            {fromx: 50, fromy: 50, tox: 200, toy: 50, url: 'https://example.com', agent: 'Sova', skill: 'Sova-E', hoverImage: 'path/to/hover_image1.jpg'},
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
    'Sova': 'Agents/sova.png',
    'Viper': 'Agents/viper.png',
    'Viper2': 'Agents/viper.png',
    'Viper3': 'Agents/viper.png',
    'Viper4': 'Agents/viper.png',
};

const skillColors = {
    'Sova-Q': '#69b4FF',
    'Sova-E': '#FFB469',
    'Viper-C': '#69FFb4',
};