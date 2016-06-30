let dnd = document.getElementById('dnd'),
    canvas = document.getElementById('canvas'),

    mouseDown = Rx.Observable.fromEvent(dnd, 'mousedown'),
    mouseUp = Rx.Observable.fromEvent(window, 'mouseup'),
    mouseMoves = Rx.Observable.fromEvent(window, 'mousemove'),
    mouseDrag;

const CANVAS_WIDTH = 700,
      CANVAS_HEIGHT = 300,
      DND_SIZE = 102,
      MAX_X = canvas.offsetLeft + CANVAS_WIDTH - DND_SIZE,
      MAX_Y = canvas.offsetTop + CANVAS_HEIGHT - DND_SIZE;

mouseDrag = mouseDown
    .concatMap(contactPoint =>
        mouseMoves.takeUntil(mouseUp)
        .map(mouseMove => {
            let  pageX = (mouseMove.pageX - contactPoint.offsetX),
                 pageY = (mouseMove.pageY - contactPoint.offsetY);

            return getPosition({ x: pageX, y: pageY });
        })
    );

mouseDrag.forEach(drag => {
    dnd.style.position = 'absolute';
    dnd.style.left = drag.x + 'px';
    dnd.style.top = drag.y + 'px';
});

function getPosition(coords) {
    let x = coords.x,
        y = coords.y,
        minX = canvas.offsetLeft,
        minY = canvas.offsetTop,
        result = {};

    result.x = x >= MAX_X ? MAX_X : x <= minX ? minX : x;
    result.y = y >= MAX_Y ? MAX_Y : y <= minY ? minY : y;

    return result;
}
