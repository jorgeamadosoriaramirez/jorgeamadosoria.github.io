import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  PDFViewer,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { ResumeProps } from "../resumes/ResumeUtils";
import EntryType from "../../data/enums/EntryType";
import SocialType from "../../data/enums/SocialType";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 15,
    paddingTop: 35,
    paddingBottom: 35,
  },

  separator: {
    borderBottom: "black",
    borderBottomWidth: 4,
    marginBottom: 4,
    marginTop: 4,
  },
  thinSeparator: {
    borderBottom: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 4,
    marginTop: 4,
  },
  icon: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderColor: "black",
    border: 1,
    width: 30,
    height: 30,
    left: -26,
    backgroundColor: "white",
    zIndex: 1000,
    position: "absolute",
    paddingTop: 6,
    paddingLeft: 3,
    alignItems: "center",
  },
  contactIcon: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginRight: 20,
    paddingTop: 6,
    paddingLeft: 5,
    alignItems: "center",
    width: 30,
    height: 30,
    left: -30,
    backgroundColor: "white",
    zIndex: 1000,
    position: "absolute",
  },
  sectionSeparator: {
    borderBottom: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 6,
    marginTop: 6,
    width: 400,
    alignSelf: "center",
  },
  positions: {
    fontSize: 12,
  },
  sectionName: { fontSize: 30 },
  sectionSummary: { marginBottom: 10 },
  sectionContacts: {
    flexGrow: 1,
  },
  sectionLanguages: {
    flexGrow: 1,
  },
  sectionSkillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "space-between",
    fontSize: 18,
  },
  sectionSkills: {
    width: 181,
  },
  sectionEntries: {
    borderLeft: 2,
    marginLeft: 10,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeftColor: "black",
  },
});

const getIcon = (type: string) => {
  var path = null;
  switch (type) {
    case "residence":
      path = (
        <Path
          fill="black"
          d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
        ></Path>
      );
      break;
    case "phone":
      path = (
        <Path
          fill="black"
          d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
        ></Path>
      );
      break;
    case "email":
      path = (
        <Path
          fill="black"
          d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
        ></Path>
      );
      break;
    case SocialType.GITHUB:
      path = (
        <Path
          fill="black"
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        ></Path>
      );
      break;
    case SocialType.FACEBOOK:
      path = (
        <Path
          fill="black"
          d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
        ></Path>
      );
      break;
    case SocialType.LINKEDIN:
      path = (
        <Path
          fill="black"
          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
        ></Path>
      );
      break;
    case EntryType.WORK:
      path = (
        <Path
          fill="black"
          d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"
        ></Path>
      );
      break;
    case EntryType.EDUCATION:
      path = (
        <Path
          fill="black"
          d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"
        ></Path>
      );
      break;
    case EntryType.VOLUNTEERING:
      path = (
        <Path
          fill="black"
          d="M488 192H336v56c0 39.7-32.3 72-72 72s-72-32.3-72-72V126.4l-64.9 39C107.8 176.9 96 197.8 96 220.2v47.3l-80 46.2C.7 322.5-4.6 342.1 4.3 357.4l80 138.6c8.8 15.3 28.4 20.5 43.7 11.7L231.4 448H368c35.3 0 64-28.7 64-64h16c17.7 0 32-14.3 32-32v-64h8c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm147.7-37.4L555.7 16C546.9.7 527.3-4.5 512 4.3L408.6 64H306.4c-12 0-23.7 3.4-33.9 9.7L239 94.6c-9.4 5.8-15 16.1-15 27.1V248c0 22.1 17.9 40 40 40s40-17.9 40-40v-88h184c30.9 0 56 25.1 56 56v28.5l80-46.2c15.3-8.9 20.5-28.4 11.7-43.7z"
        ></Path>
      );
      break;
    case EntryType.CERTIFICATION:
      path = (
        <Path
          fill="black"
          d="M458.622 255.92l45.985-45.005c13.708-12.977 7.316-36.039-10.664-40.339l-62.65-15.99 17.661-62.015c4.991-17.838-11.829-34.663-29.661-29.671l-61.994 17.667-15.984-62.671C337.085.197 313.765-6.276 300.99 7.228L256 53.57 211.011 7.229c-12.63-13.351-36.047-7.234-40.325 10.668l-15.984 62.671-61.995-17.667C74.87 57.907 58.056 74.738 63.046 92.572l17.661 62.015-62.65 15.99C.069 174.878-6.31 197.944 7.392 210.915l45.985 45.005-45.985 45.004c-13.708 12.977-7.316 36.039 10.664 40.339l62.65 15.99-17.661 62.015c-4.991 17.838 11.829 34.663 29.661 29.671l61.994-17.667 15.984 62.671c4.439 18.575 27.696 24.018 40.325 10.668L256 458.61l44.989 46.001c12.5 13.488 35.987 7.486 40.325-10.668l15.984-62.671 61.994 17.667c17.836 4.994 34.651-11.837 29.661-29.671l-17.661-62.015 62.65-15.99c17.987-4.302 24.366-27.367 10.664-40.339l-45.984-45.004z"
        ></Path>
      );
      break;
  }
  return (
    <Svg width={18} height={18} viewBox="0 0 600 600">
      {path}
    </Svg>
  );
};

const FlatResumePDF = ({ resume, relevance }: ResumeProps) => {
  const { name, positions, summary, contacts, languages, skills, entries } =
    resume.prepareResume(relevance);
  const joinedPositions = positions
    .map((position) => position.value)
    .join(", ");

  return (
    <PDFViewer
      width="100%"
      height="1000"
      style={{ top: "40px", position: "relative" }}
    >
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionName}>
            <Text>{name.value}</Text>
            <Text style={styles.positions}>{joinedPositions}</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.sectionSummary}>
            <Text>{summary.value}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.sectionContacts}>
              {contacts.map((contact, index) => (
                <View style={{ marginLeft: 24 }}>
                  <View style={styles.contactIcon}>
                    {getIcon(contact.type)}
                  </View>
                  <Text style={{ marginTop: 4, marginBottom: 4 }} key={index}>
                    {contact.url ? (
                      <Link src={contact.url}>{contact.name}</Link>
                    ) : (
                      <Text>{contact.name}</Text>
                    )}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.sectionLanguages}>
              {languages.map((language, index) => (
                <Text style={{ marginTop: 4, marginBottom: 4 }} key={index}>
                  {language.code}&nbsp;
                  {language.level}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.thinSeparator}></View>
          <View style={styles.sectionSkillContainer}>
            {skills.map((skill, index) => (
              <View style={styles.sectionSkills} key={index}>
                <Text>
                  <Text>{skill.name}</Text>
                  <Text style={{ fontSize: 10 }}>&nbsp;({skill.level})</Text>
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.thinSeparator}></View>
          <View style={styles.sectionEntries}>
            {entries.map((entry, index) => {
              return (
                <View wrap={false} key={index}>
                  <View style={styles.icon}>{getIcon(entry.type)}</View>
                  <Text style={{ marginTop: 6, marginLeft: 10 }}>
                    {new Date(entry.fromDate).toLocaleDateString()}
                    {entry.toDate &&
                      " -> ".concat(
                        new Date(entry.toDate).toLocaleDateString()
                      )}
                  </Text>
                  <Text style={{ marginLeft: 10 }}>
                    {entry.name}&nbsp;@&nbsp;
                    {entry.type !== EntryType.CERTIFICATION ? (
                      <Text style={{ marginLeft: 10 }}>
                        {entry.reference.value ? (
                          <Link src={entry.reference.value}>
                            {entry.entity}
                          </Link>
                        ) : (
                          entry.entity
                        )}
                      </Text>
                    ) : (
                      <Text style={{ marginLeft: 10 }}>
                        {entry.entity}
                        &nbsp;&nbsp;
                        {entry.reference.value && (
                          <Link src={entry.reference.value}>Reference</Link>
                        )}
                      </Text>
                    )}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      fontStyle: "italic",
                    }}
                  >
                    {entry.description.value}
                  </Text>
                  <View style={styles.sectionSeparator}></View>
                </View>
              );
            })}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FlatResumePDF;
