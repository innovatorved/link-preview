import jsdom from "jsdom";

export default function handler(req, res) {
  const { urlString } = req.query;
  const { JSDOM } = jsdom;

  JSDOM.fromURL(urlString, {
    method : 'GET'
  }).then((dom) => {
    const { document } = dom.window;
    const title = document.title;
    const metaDescription = document.querySelectorAll('meta[name]');
    const icon = document.querySelector('link[rel=icon]').getAttribute('href');

    const metaJSON = {};
    metaDescription.forEach((tag => {
      metaJSON[tag.getAttribute("name")] = tag.getAttribute("content");
    }))
    const data = {
      icon : `${dom.window.location.href}${icon}`,
      title,
      metaJSON,
    }
    res.status(200).json({ 
      success : true, 
      data : data
    });
  });
  return;
}

