function dist2(x1,y1,x2,y2)
{
    var dx = x1-x2;
    var dy = y1-y2;
    return dx*dx + dy*dy;
}

function Barycentric(p, a,  b, c)
{
    var v0 = {x:b.x - a.x,y:b.y - a.y};
    var v1 = {x:c.x - a.x,y:c.y - a.y};
    var v2 = {x:p.x - a.x,y:p.y - a.y};
    var den = v0.x * v1.y - v1.x * v0.y;
    var v = (v2.x * v1.y - v1.x * v2.y) / den;
    var w = (v0.x * v2.y - v2.x * v0.y) / den;
    var u = 1.0 - v - w;
    return {u:u,v:v,w:w};
}

function scanLine(x1, y1, x2, y2, f) {


    var dx = x2 - x1;
    var dy = y2 - y1;

    //assume abs(dx) > abs(dy):

    var sqrt2= Math.sqrt(2.0);

    var eps2 = 1e-3;
    var totd = dist2(x1,y1,x2,y2);

    if (Math.abs(dx) > Math.abs(dy)) {
        
        if (x2 < x1) {
            var tx1 = x1;
            var ty1 = y1;
            x1 = x2;
            y1 = y2;
            x2 = tx1;
            y2 = ty1;
        }

        var ix2 = Math.floor(x2);
        var iy2 = Math.floor(y2);

        //console.log("ix2: " + ix2 + " iy2 :" + iy2);

        var x = x1;
        var y = y1;


        var ix = Math.floor(x);
        var iy = Math.floor(y);

        
        var d = dist2(x1,y1,x,y);
        var done = d > totd ;

        var gradient = dy / dx;
        

        var co = 0;
        var eps = 0;
        
        while (done == false && co < 1000) {
            var vhit = (ix + 1 - x) * gradient - (iy + 1 - y);
            var prevx = x;
            var prevy = y;
            if (vhit < -eps) {
                y = y + gradient * (ix + 1 - x);
                x = ix + 1;
            }
            else if (vhit >= eps) {
                x = x + (iy + 1 - y) / gradient;
                y = iy + 1;
            }
            else {
                x = ix + 1;
                y = iy + 1;
            }
            //console.log("x: " + x + " y :" + y);

            ix = Math.floor(x);
            iy = Math.floor(y);

            //done = (ix == ix2 || ixp == ix2) && (iy == iy2 || iyp == iy2);
            //done = dist2(x,y,x2,y2) < sqrt2 ;
            //d = dist2(x,y,x2,y2);
            //var done = d > prevd ;
            d = dist2(x1,y1,x,y);
            done = d > totd ;

            if( done == false && co >= 0 )
            {
                f((x+prevx)/2,(y+prevy)/2);
            }
            /*
            else if( done == false && co == 0) // Should never be called
            {
                f(x1,y1);
            }*/
            else
            {
                f((x2+prevx)/2,(y2+prevy)/2);
            }


            co++;
        }
    }
    else {
        //Same code as above with x and y swapped
        if (y2 < y1) {
            var ty1 = y1;
            var tx1 = x1;
            y1 = y2;
            x1 = x2;
            y2 = ty1;
            x2 = tx1;
        }

        var iy2 = Math.floor(y2);
        var ix2 = Math.floor(x2);

        //console.log("iy2: " + iy2 + " ix2 :" + ix2);

        var y = y1;
        var x = x1;


        var iy = Math.floor(y);
        var ix = Math.floor(x);

        var gradient = dx / dy;
        //var done = (iy == iy2) && (ix == ix2);
        //var done = dist2(x,y,x2,y2) < sqrt2 ;
        //var prevd = dist2(x,y,x2,y2);
        //var d = dist2(x,y,x2,y2);
        //var done = d > prevd ;
        var d = dist2(x1,y1,x,y);
        var done = d > totd ;

        var co = 0;
        var eps = 0;
        while (done == false && co < 1000) {
            var vhit = (iy + 1 - y) * gradient - (ix + 1 - x);
            var prevx = x;
            var prevy = y;
            if (vhit < -eps) {
                x = x + gradient * (iy + 1 - y);
                y = iy + 1;
            }
            else if (vhit >= eps) {
                y = y + (ix + 1 - x) / gradient;
                x = ix + 1;
            }
            else {
                y = iy + 1;
                x = ix + 1;
            }
            //console.log("y: " + y + " x :" + x);
            iy = Math.floor(y);
            ix = Math.floor(x);
            var ixp = Math.floor(x+eps2);
            var iyp = Math.floor(y+eps2);
            //done = (ix == ix2 || ixp == ix2) && (iy == iy2 || iyp == iy2);
            //done = dist2(x,y,x2,y2) < sqrt2 ;
            //d = dist2(x,y,x2,y2);
            //var done = d > prevd || (ix==ix2 &&iy == iy2);
            //prevd = d;
            d = dist2(x1,y1,x,y);
            done = d > totd ;

            if( done == false && co >= 0 )
            {
                f((x+prevx)/2,(y+prevy)/2);
            }
            /*
            else if( done == false && co == 0) // Should never be called
            {
                f(x1,y1);
            }*/
            else
            {
                f((x2+prevx)/2,(y2+prevy)/2);
            }

            co++;
        }
    }




}