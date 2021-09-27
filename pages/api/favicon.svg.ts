import type { NextApiRequest, NextApiResponse } from 'next';
import { url2colors } from 'lib/util';
import type { HSV } from 'lib/color';
import { hsv2css, uiColor, makeRandomColor } from 'lib/color';
import { makeSVG } from 'lib/favicon';


export default function favicon(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.colors) {
        const c = makeRandomColor();
        const query = [hsv2css(uiColor(c, 3)).slice(1), hsv2css(c).slice(1), hsv2css(uiColor(c)).slice(1)].join(',');
        res.redirect('/favicon.svg?colors=' + query);
        return
    }

    const colors = url2colors(req.query.colors);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(makeSVG(colors));
};
