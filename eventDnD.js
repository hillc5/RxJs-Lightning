function runDnD() {
    var dnd = document.getElementById('dnd'),
        canvas = document.getElementById('canvas'),
        initLeft,
        initTop,
        dragStartX,
        dragStartY,
        moving = false,

        CANVAS_WIDTH = 700,
        CANVAS_HEIGHT = 300,
        DND_SIZE = 102, // 1px border
        MAX_X = canvas.offsetLeft + CANVAS_WIDTH - DND_SIZE,
        MAX_Y = canvas.offsetTop + CANVAS_HEIGHT - DND_SIZE;

    dnd.addEventListener('mousedown', e => {
        initTop = e.target.offsetTop;
        initLeft = e.target.offsetLeft;
        dragStartX = e.pageX;
        dragStartY = e.pageY;
        moving = true;
    });

    window.addEventListener('mousemove', e => {
        var top, left, position;

        if (moving) {
            left = (initLeft + (e.pageX - dragStartX));
            top = (initTop + (e.pageY - dragStartY));
            position = getPosition({ x: left, y: top });

            dnd.style.position = 'absolute';
            dnd.style.left =  position.x + 'px';
            dnd.style.top =  position.y + 'px';
        }
    });

    window.addEventListener('mouseup', e => {
        moving = false;
    });

    function getPosition(coords) {
        var x = coords.x,
            y = coords.y,
            minX = canvas.offsetLeft,
            minY = canvas.offsetTop,
            result = {};

        result.x = x >= MAX_X ? MAX_X : x <= minX ? minX : x;
        result.y = y >= MAX_Y ? MAX_Y : y <= minY ? minY : y;

        return result;
    }
}

document.onLoad = runDnD();
