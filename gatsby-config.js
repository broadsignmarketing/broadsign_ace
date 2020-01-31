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
        name: `slidesImages`,
        path: `${__dirname}/static/images/uploads`,
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
			name: `Broadsign Ace`,
			short_name: `Ace`,
			description: `The little ace in your iSleeve`,
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
		options: {
			globPatterns: [
				'**/*.{js,jpg,png,html,css}',
			],
			workboxConfig: {
				importWorkboxFrom: `cdn`,
				dontCacheBustURLsMatching: /(\.png$|\.jpg$|static\/|images\/)/,
				runtimeCaching: [
					{
					  // Use cacheFirst since these don't need to be revalidated ; same RegExp and same reason as above
					  urlPattern: /(\.png$|\.jpg$|static\/|images\/)/,
					  handler: `cacheFirst`,
					},
				],
			},
		}
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
