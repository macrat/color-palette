import type { NextApiRequest, NextApiResponse } from 'next';
import { url2colors } from 'lib/util';
import type { HSV } from 'lib/color';
import { hsv2css, uiColor, makeRandomColor } from 'lib/color';
import { makeSVG } from 'lib/favicon';


export default function favicon(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.colors) {
        const c = makeRandomColor();
        const query = [hsv2css(uiColor(c, 3)).slice(1), hsv2css(c).slice(1), hsv2css(uiColor(c)).slice(1)].join(',');
        let url = '/api/icon.svg?colors=' + query;

        if (Number(req.query.round) || Number(req.query.round) === 0) {
            url += '&round=' + String(Math.max(0, Math.min(1, Number(req.query.round))));
        }

        if (Number(req.query.width) || Number(req.query.width) === 0) {
            url += '&width=' + String(Math.max(0, Number(req.query.width)));
        }

        if (Number(req.query.height) || Number(req.query.height) === 0) {
            url += '&height=' + String(Math.max(0, Number(req.query.height)));
        }

        res.redirect(url);
        return
    }

    const opts = {
        round: Math.max(0, Math.min(1, Number(req.query.round ?? 0.4))) / 2.0,
        width: Math.max(0, Number(req.query.width ?? 512)),
        height: Math.max(0, Number(req.query.height ?? 512)),
    };

    const colors = url2colors(req.query.colors);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(makeSVG(colors, opts));
};
