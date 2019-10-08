module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
	{
		resolve: `gatsby-plugin-react-helmet`,
	},
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/slides`,
      },
	},
	{
		resolve: `gatsby-transformer-sharp`,
	},
	{
		resolve: `gatsby-plugin-sharp`,
	},
    {
		resolve: `gatsby-plugin-manifest`,
		options: {
			name: `broadsign-ace`,
			short_name: `Ace`,
			start_url: `/`,
			background_color: `#001464`,
			theme_color: `#001464`,
			display: `standalone`,
			icon: `src/images/icons/android-chrome-192x192.png`, // This path is relative to the root of the site.
		},
	},
	{
		resolve: "gatsby-plugin-netlify-cms"
	},
	{
		resolve: `gatsby-plugin-offline`,
	},
	{
		resolve: `gatsby-transformer-remark`,
		options: {
		  // CommonMark mode (default: true)
		  commonmark: true,
		  // Footnotes mode (default: true)
		  footnotes: false,
		  // Pedantic mode (default: true)
		  pedantic: false,
		  // GitHub Flavored Markdown mode (default: true)
		  gfm: true,
		  // Plugins configs
		  plugins: [],
		},
	},
  ],
}
