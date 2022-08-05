import jsdom from "jsdom";

export default function handler(req, res) {
  try {
    const { urlString } = req.query;
    const { JSDOM } = jsdom;

    JSDOM.fromURL(urlString, {
      method: 'GET'
    }).then((dom) => {
      const { document } = dom.window;
      const title = document.title;
      const metaDescription = document.querySelectorAll('meta[name]');
      let icon = "";
      try {
        icon = document.querySelector('link[rel=icon]').getAttribute('href');
        icon = icon.startsWith("http") ? icon : `http://${dom.window.location.hostname}${icon}`;
      } catch {
        icon = "";
      }
      if (icon === "") {
        try {
          icon = document.querySelector('link[rel="shortcut icon"]').getAttribute('href');
          icon = icon.startsWith("http") ? icon : `http://${dom.window.location.hostname}${icon}`;
        } catch {
          icon = "";
        }
      }

      const metaJSON = {};
      metaDescription.forEach((tag => {
        metaJSON[ tag.getAttribute("name") ] = tag.getAttribute("content");
      }))
      const data = {
        icon,
        title,
        metaJSON,
      }
      res.status(200).json({
        success: true,
        data: data
      });
    })
    .catch((err)=>{
      res.status(200).json({
        success: false
      });
    })
    return;
  } catch (error) {
    return res.status(200).json({
      success: false
    });
  }
  return;
}

