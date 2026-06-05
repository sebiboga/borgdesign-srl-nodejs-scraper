import { jest } from "@jest/globals";
import { extractJobs, extractEJobs, mapToJobModel } from "../index.js";

const COMPANY_CIF = "14837428";
const COMPANY_NAME = "BORG DESIGN SRL";

function createMockHtml(jobs) {
  let html = `<!DOCTYPE html><html><body>`;

  for (const job of jobs) {
    html += `<div class="title">${job.title_html || job.title}</div>
             <div class="dept">${job.department || ""}</div>`;
  }

  html += `</body></html>`;
  return html;
}

describe("extractJobs", () => {
  test("extracts simple titles without br", () => {
    const html = createMockHtml([
      { title: "Help Desk IT", department: "IT Hardware" },
      { title: "Specialist Marketing", department: "Marketing" },
      { title: "Specialist Vânzări", department: "Vânzări" }
    ]);

    const jobs = extractJobs(html);
    expect(jobs).toHaveLength(3);
    expect(jobs[0].title).toBe("Help Desk IT");
    expect(jobs[0].department).toBe("IT Hardware");
    expect(jobs[0].url).toBe("https://jobs.borgdesign.ro/#1");
    expect(jobs[1].title).toBe("Specialist Marketing");
    expect(jobs[2].title).toBe("Specialist Vânzări");
  });

  test("extracts titles with br tag", () => {
    const html = createMockHtml([
      { title_html: "Senior<br/>Web Developer", department: "Web Dev" },
      { title_html: "Junior<br/>Web Developer", department: "Web Dev" }
    ]);

    const jobs = extractJobs(html);
    expect(jobs).toHaveLength(2);
    expect(jobs[0].title).toBe("Senior Web Developer");
    expect(jobs[1].title).toBe("Junior Web Developer");
  });

  test("extracts mixed titles (with and without br)", () => {
    const html = createMockHtml([
      { title_html: "Senior<br/>Web Developer", department: "Web" },
      { title: "Help Desk IT", department: "IT" },
      { title_html: "Junior<br/>Developer AI", department: "AI" }
    ]);

    const jobs = extractJobs(html);
    expect(jobs).toHaveLength(3);
    expect(jobs[0].title).toBe("Senior Web Developer");
    expect(jobs[1].title).toBe("Help Desk IT");
    expect(jobs[2].title).toBe("Junior Developer AI");
  });

  test("filters out non-job title divs (containing HTML)", () => {
    const html = [
      '<div class="title">',
      '<li>Descrierea jobului:</li>',
      '</div>',
      '<div class="title">Web Developer</div>'
    ].join("\n");

    const jobs = extractJobs(html);
    expect(jobs).toHaveLength(1);
    expect(jobs[0].title).toBe("Web Developer");
  });

  test("returns empty array when no job titles found", () => {
    const html = "<html><body>no jobs</body></html>";
    const jobs = extractJobs(html);
    expect(jobs).toEqual([]);
  });

  test("handles multiple spaces and newlines in titles", () => {
    const html = [
      '<div class="title">',
      "  Senior  ",
      "  <br/>  ",
      "  Developer  ",
      '</div>'
    ].join("\n");

    const jobs = extractJobs(html);
    expect(jobs).toHaveLength(1);
    expect(jobs[0].title).toBe("Senior Developer");
  });
});

describe("mapToJobModel", () => {
  test("maps raw job to correct model", () => {
    const rawJob = {
      title: "Web Developer",
      url: "https://jobs.borgdesign.ro/#1"
    };

    const result = mapToJobModel(rawJob, COMPANY_CIF, COMPANY_NAME);

    expect(result).toEqual({
      url: "https://jobs.borgdesign.ro/#1",
      title: "Web Developer",
      company: COMPANY_NAME,
      cif: COMPANY_CIF,
      location: ["București"],
      country: ["România"],
      date: expect.any(String),
      status: "scraped"
    });
  });

  test("creates unique URLs for each job", () => {
    const jobs = [
      { title: "Job 1", url: "https://jobs.borgdesign.ro/#1" },
      { title: "Job 2", url: "https://jobs.borgdesign.ro/#2" }
    ];

    const results = jobs.map(j => mapToJobModel(j, COMPANY_CIF, COMPANY_NAME));
    expect(results[0].url).not.toBe(results[1].url);
  });
});

describe("extractEJobs", () => {
  function createMockNuxtData(jobs) {
    const data = [null];
    const jobEntries = [];
    let idx = 1;

    for (const job of jobs) {
      const titleStr = job.title;
      const slugStr = job.slug;
      const idNum = job.id;

      const titleIdx = idx++;
      const slugIdx = idx++;
      const idIdx = idx++;
      const cityIdIdx = idx++;
      const addressIdx = idx++;
      const locReactiveIdx = idx++;
      const locArrayIdx = idx++;
      const jobIdx = idx++;

      data[titleIdx] = titleStr;
      data[slugIdx] = slugStr;
      data[idIdx] = idNum;
      data[cityIdIdx] = job.cityId || 1;
      data[addressIdx] = job.address || "București, România";
      data[locReactiveIdx] = ["Reactive", locArrayIdx];
      data[locArrayIdx] = { cityId: cityIdIdx, address: addressIdx };
      data[jobIdx] = { id: idIdx, title: titleIdx, slug: slugIdx, locations: locReactiveIdx };

      jobEntries.push(jobIdx);
    }

    const nuxtHtml = `<script>window.__NUXT_DATA__">${JSON.stringify(data)}</script>`;
    return nuxtHtml;
  }

  test("extracts jobs from Nuxt data", () => {
    const html = createMockNuxtData([
      { id: 1001, title: "Customer Support Specialist", slug: "customer-support-specialist", address: "București, România" },
      { id: 1002, title: "Python Developer – Web & AI", slug: "python-developer-web-ai", address: "București, România" }
    ]);

    const jobs = extractEJobs(html);
    expect(jobs).toHaveLength(2);
    expect(jobs[0].title).toBe("Customer Support Specialist");
    expect(jobs[0].url).toBe("https://www.ejobs.ro/job/customer-support-specialist-1001");
    expect(jobs[0].department).toBe("eJobs");
    expect(jobs[1].title).toBe("Python Developer – Web & AI");
    expect(jobs[1].url).toBe("https://www.ejobs.ro/job/python-developer-web-ai-1002");
  });

  test("returns empty array when no Nuxt data found", () => {
    const jobs = extractEJobs("<html><body>no jobs</body></html>");
    expect(jobs).toEqual([]);
  });

  test("returns empty array when Nuxt data has no job objects", () => {
    const html = `<script>window.__NUXT_DATA__">${JSON.stringify([null, "foo", "bar"])}</script>`;
    const jobs = extractEJobs(html);
    expect(jobs).toEqual([]);
  });

  test("handles single job", () => {
    const html = createMockNuxtData([
      { id: 2001, title: "Python Developer", slug: "python-developer", address: "București, România" }
    ]);

    const jobs = extractEJobs(html);
    expect(jobs).toHaveLength(1);
    expect(jobs[0].title).toBe("Python Developer");
  });
});
