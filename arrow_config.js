const imageConfigs = {
    haven_atk: {
        src: "maps/Haven_atk.png",
        arrows: [
            {fromx: 906, fromy: 475, tox: 680, toy: 630, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'sova', key: 'E', hoverImage: 'arrows/haven/sova/000.jpg'},
        ],
        agents: ['sova']
    },
    haven_def: {
        src: "maps/Haven_def.png",
        arrows: [
            {fromx: 118, fromy: 549, tox: 344, toy: 394, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'sova', key: 'E', hoverImage: 'arrows/haven/sova/000.jpg'},
            {fromx: 50, fromy: 100, tox: 200, toy: 100, url: 'https://example.org', agent: 'sova', key: 'Q', hoverImage: 'path/to/hover_image2.jpg'},
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'viper', key: 'C', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['sova', 'viper']
    },
    bind_atk: {
        src: "maps/Bind_atk.png",
        arrows: [
            {fromx: 118, fromy: 549, tox: 344, toy: 394, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'fade', key: 'E', hoverImage: 'arrows/haven/sova/000.jpg'},
            {fromx: 50, fromy: 100, tox: 200, toy: 100, url: 'https://example.org', agent: 'viper', key: 'C', hoverImage: 'path/to/hover_image2.jpg'},
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'viper', key: 'Q', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['fade', 'viper']
    },
    bind_def: {
        src: "maps/Bind_def.png",
        arrows: [
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'fade', key: 'E', hoverImage: 'path/to/hover_image3.jpg'},
            {fromx: 50, fromy: 200, tox: 200, toy: 200, url: 'https://example.net', agent: 'viper', key: 'Q', hoverImage: 'path/to/hover_image3.jpg'},
            {fromx: 50, fromy: 250, tox: 200, toy: 250, url: 'https://example.net', agent: 'viper', key: 'E', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['fade', 'viper']
    },
    pearl_atk: {
        src: "maps/Pearl_atk.png",
        arrows: [
            {fromx: 118, fromy: 549, tox: 344, toy: 394, url: 'https://www.notion.so/pelkira/A-A-b530eadf04b64d839e5458e10b0cd9c4', agent: 'fade', key: 'E', hoverImage: 'arrows/haven/sova/000.jpg'},
            {fromx: 50, fromy: 100, tox: 200, toy: 100, url: 'https://example.org', agent: 'fade', key: 'Q', hoverImage: 'path/to/hover_image2.jpg'},
            {fromx: 50, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'viper', key: 'C', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['fade', 'viper']
    },
    pearl_def: {
        src: "maps/Pearl_def.png",
        arrows: [
            {fromx: 0, fromy: 150, tox: 200, toy: 150, url: 'https://example.net', agent: 'viper', key: 'C', hoverImage: 'path/to/hover_image3.jpg'},
            {fromx: 643, fromy: 548, tox: 498, toy: 480, url: 'https://www.notion.so/pelkira/B-1-way-8288ae9cee304f8fb80aa8987dfc5e10', agent: 'viper', key: 'Q', hoverImage: 'arrows/pearl/viper/00_link1way.jpeg'},
            {fromx: 50, fromy: 250, tox: 200, toy: 250, url: 'https://example.net', agent: 'viper', key: 'E', hoverImage: 'path/to/hover_image3.jpg'}
        ],
        agents: ['viper']
    }
};

function getAgentIconPath(agent){
    return 'agents/' + agent + '.png';
}

function getSkillIconPath(agent, key){
    return 'skills/' + agent + '-' + key + '.png';
}
// hoverColor: '#FF69B4',
const skillData = {
    'sova': {
        'Q': {
            color: '#FFEB58',
        },
        'E': {
            color: '#EFA92A',
        }
    },
    'viper': {
        'C': {
            color: '#a5ff7c',
        },
        'Q': {
            color: '#a0b72d',
        },
        'E': {
            color: '#44A720',
        }
    },
    'fade': {
        'E': {
            color: '#ddaadd',
        }
    }
}