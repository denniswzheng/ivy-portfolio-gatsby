import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import LeftIcon from "../img/left-icon.svg";
import RightIcon from "../img/right-icon.svg";
import Layout from "../components/layout";
import Seo from "../components/seo";

// Import Slider React components
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogPostTemplate = (props) => {
  var sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { pageContext } = props;
  const nextSlug = pageContext?.next
    ? pageContext?.next?.fields?.slug.split("/").slice(2, -1).join("/") === ""
      ? "/"
      : `/${pageContext.next.fields.slug.split("/").slice(2, -1).join("/")}`
    : "/";
  const previousSlug = pageContext.previous
    ? pageContext?.previous?.fields?.slug?.split("/").slice(2, -1).join("/") ===
      ""
      ? "/"
      : `/${pageContext.previous.fields.slug.split("/").slice(2, -1).join("/")}`
    : "/";
  const nextLinkStatus = pageContext?.next
    ? pageContext?.next?.frontmatter?.templateKey === "work-sub-page"
      ? true
      : false
    : false;
  const previousLinkStatus = pageContext?.previous
    ? pageContext?.previous?.frontmatter?.templateKey === "work-sub-page"
      ? true
      : false
    : false;

  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const social = props.data.site.siteMetadata.social;
  const images = post.frontmatter.images.map((image) =>
    getImage(image.childImageSharp)
  );
  console.log("Images", images);

  return (
    <Layout location={props.location} title={siteTitle} social={social}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={
          post.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images
            .fallback.src
        }
      />
      <article
        className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
      >
        <header className="post-content-header">
          <h1 className="post-content-title">{post.frontmatter.title}</h1>
        </header>
        {post.frontmatter.description && (
          <p className="post-content-excerpt">{post.frontmatter.description}</p>
        )}
        <div>
          {/* Image Slider */}
          {images && images.length > 0 && (
            <Slider {...sliderSettings}>
              {images.map((image, index) => (
                <div key={index}>
                  <GatsbyImage image={image} alt={`Slide ${index}`} />
                </div>
              ))}
            </Slider>
          )}
          {/* line breaks because the slider above isnt creating enough spacing */}
          <br></br>
          <br></br>
        </div>

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="post-link">
          <div>
            <a
              style={{
                display: nextLinkStatus ? "flex" : "none",
                alignItems: "center",
                color: "#131313",
                fontSize: "2rem",
              }}
              href={nextSlug}
            >
              <img src={LeftIcon} alt="" width={30} height={30} />
              <span>
                {pageContext.next ? pageContext.next.frontmatter.title : ""}
              </span>
            </a>
          </div>
          <div>
            <a
              style={{
                display: previousLinkStatus ? "flex" : "none",
                alignItems: "center",
                color: "#131313",
                fontSize: "2rem",
              }}
              href={previousSlug}
            >
              <span>
                {pageContext.previous
                  ? pageContext.previous.frontmatter.title
                  : ""}
              </span>
              <img src={RightIcon} alt="" width={30} height={30} />
            </a>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        images {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
