const img = document.getElementById('mainImage');
const canvas = document.getElementById('arrowCanvas');
const ctx = canvas.getContext('2d');
const agentIconsContainer = document.getElementById('agentIcons');
const hoverImageContainer = document.getElementById('hoverImageContainer');
const hoverImage = document.getElementById('hoverImage');

let arrows = [];
let activeAgents = [];

function getUrlParameter(name) {
    name = name.replace(/[$$]/, '\$$').replace(/[$$]/, '\$$');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const imageId = getUrlParameter('id');
const config = imageConfigs[imageId];

if (config) {
    img.src = config.src;
    arrows = config.arrows;
    activeAgents = [...config.agents];
    createAgentIcons(config.agents);
} else {
    console.error('Invalid image ID');
}

function createAgentIcons(agents) {
    agents.forEach(agent => {
        const icon = document.createElement('img');
        icon.src = agentIcons[agent];
        icon.alt = agent;
        icon.classList.add('agentIcon', 'active');
        icon.onclick = () => toggleAgent(agent, icon);
        agentIconsContainer.appendChild(icon);
    });
}

function toggleAgent(agent, icon) {
    if (activeAgents.includes(agent)) {
        activeAgents = activeAgents.filter(a => a !== agent);
        icon.classList.remove('active');
    } else {
        activeAgents.push(agent);
        icon.classList.add('active');
    }
    drawArrows();
}
let originalWidth, originalHeight;

img.onload = function() {
    originalWidth = this.naturalWidth;
    originalHeight = this.naturalHeight;
    resizeCanvasAndDrawArrows();
};

function resizeCanvasAndDrawArrows() {
    const container = document.getElementById('imageContainer');
    const ratio = Math.min(container.clientWidth / originalWidth, container.clientHeight / originalHeight);
    
    canvas.width = originalWidth * ratio;
    canvas.height = originalHeight * ratio;
    
    drawArrows();
}


function drawArrows() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;
    
    arrows.filter(arrow => activeAgents.includes(arrow.agent)).forEach(arrow => {
        const scaledArrow = {
            fromx: arrow.fromx * scaleX,
            fromy: arrow.fromy * scaleY,
            tox: arrow.tox * scaleX,
            toy: arrow.toy * scaleY,
            hover: arrow.hover,
            skill: arrow.skill,
            agent: arrow.agent,
            url: arrow.url,
            hoverImage: arrow.hoverImage
        };
        drawArrow(scaledArrow);
    });
}

// ウィンドウサイズが変更されたときに再描画
window.addEventListener('resize', resizeCanvasAndDrawArrows);

function drawArrow(arrow) {
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;
	const scale = Math.min(scaleX, scaleY)
    const {fromx, fromy, tox, toy, hover, skill} = arrow;
    const headlen = 20 * scale;
    const angle = Math.atan2(toy-fromy, tox-fromx);

    const adjustedTox = tox - headlen * Math.cos(angle);
    const adjustedToy = toy - headlen * Math.sin(angle);

    // スキルに基づいて色を設定
    const arrowColor = skillColors[skill] || '#FF69B4'; // デフォルト色

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(adjustedTox, adjustedToy);
    ctx.strokeStyle = hover ? '#00FFFF' : arrowColor;
    ctx.lineWidth = 4 * scale;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6), toy-headlen*Math.sin(angle-Math.PI/6));
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6), toy-headlen*Math.sin(angle+Math.PI/6));
    ctx.closePath();
    ctx.fillStyle = hover ? '#00FFFF' : arrowColor;
    ctx.fill();

    if (hover) {
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 20 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        // ホバー時に画像を表示
        const hoverImage = document.getElementById('hoverImage');
        hoverImage.src = arrow.hoverImage;
        hoverImage.style.display = 'block';
    }	
}

canvas.onmousemove = function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;
	console.log(x / scaleX, y / scaleY)

    let hoveredArrows = arrows.filter(arrow => 
        activeAgents.includes(arrow.agent) &&
        isPointOnLine(
            arrow.fromx * scaleX, arrow.fromy * scaleY, 
            arrow.tox * scaleX, arrow.toy * scaleY, 
            x, y, 9
        )
    );

    let redraw = false;
    arrows.forEach(arrow => {
        let newHoverState = hoveredArrows.length > 0 && arrow === hoveredArrows[hoveredArrows.length - 1];
        if (arrow.hover !== newHoverState) {
            arrow.hover = newHoverState;
            redraw = true;
        }
    });
	

    if (redraw) {
        drawArrows();
    }
/*
    if (hoveredArrows.length === 0) {
        document.getElementById('hoverImage').style.display = 'none';
    }
*/

    canvas.style.cursor = hoveredArrows.length > 0 ? 'pointer' : 'default';
	
};

canvas.onclick = function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;


    let clickedArrows = arrows.filter(arrow => 
        activeAgents.includes(arrow.agent) &&
        isPointOnLine(
            arrow.fromx * scaleX, arrow.fromy * scaleY, 
            arrow.tox * scaleX, arrow.toy * scaleY, 
            x, y, 9
        )
    );

    if (clickedArrows.length > 0) {
        window.location.href = clickedArrows[clickedArrows.length - 1].url;
    }
};

function isPointOnLine(x1, y1, x2, y2, px, py, tolerance) {
	const A = px - x1;
	const B = py - y1;
	const C = x2 - x1;
	const D = y2 - y1;

	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	const param = dot / len_sq;

	let xx, yy;

	if (param < 0) {
		xx = x1;
		yy = y1;
	}
	else if (param > 1) {
		xx = x2;
		yy = y2;
	}
	else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	}

	const dx = px - xx;
	const dy = py - yy;
	const distance = Math.sqrt(dx * dx + dy * dy);

	return distance <= tolerance;
}