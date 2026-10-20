#!/usr/bin/env python3
"""
Builds public/9-questions-strykora.pdf, the HVCO delivered on /9-questions opt-in.

Source copy lives in ~/Documents/strykora-adforge/build-2026-09/HVCO-DRAFT.md.
Every question traces to a sourced complaint in research/02-pain-points.md. No
claim in here is invented, and no company is named.

Light background on purpose: contractors print these and read them at a desk, and
a dark page is unreadable on paper and burns a cartridge doing it.

Usage: python3 scripts/build-9-questions-pdf.py
"""

from pathlib import Path
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    PageBreak, Image, KeepTogether, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "9-questions-strykora.pdf"
LOGO = Path.home() / "Documents" / "Strykora-Brand" / "02-logo-kit" / "png" / "wordmark-black.png"

NAVY = colors.HexColor("#1C2B4A")
ACCENT = colors.HexColor("#2563EB")
INK = colors.HexColor("#1C2230")
MUTED = colors.HexColor("#5A6578")
RULE = colors.HexColor("#DCE2EC")
WASH = colors.HexColor("#F4F6FA")

SERIF, SERIF_B = "Times-Roman", "Times-Bold"
SANS, SANS_B, SANS_I = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"

S = {
    # 26pt keeps "9 Questions To Ask A Web Company" on one line at a 6.5in frame;
    # larger and it wraps, which turns the explicit break into a ragged third line.
    "cover_h": ParagraphStyle("cover_h", fontName=SERIF_B, fontSize=26, leading=32,
                              textColor=NAVY, spaceAfter=14),
    "cover_sub": ParagraphStyle("cover_sub", fontName=SERIF, fontSize=15, leading=21,
                                textColor=ACCENT, spaceAfter=28),
    "cover_by": ParagraphStyle("cover_by", fontName=SANS, fontSize=10.5, leading=16,
                               textColor=MUTED),
    "qnum": ParagraphStyle("qnum", fontName=SANS_B, fontSize=9.5, leading=12,
                           textColor=ACCENT, spaceAfter=5),
    "qtitle": ParagraphStyle("qtitle", fontName=SERIF_B, fontSize=18, leading=23,
                             textColor=NAVY, spaceAfter=11),
    "h2": ParagraphStyle("h2", fontName=SERIF_B, fontSize=15, leading=20,
                         textColor=NAVY, spaceBefore=6, spaceAfter=9),
    "body": ParagraphStyle("body", fontName=SANS, fontSize=10.5, leading=16.5,
                           textColor=INK, spaceAfter=10, alignment=TA_LEFT),
    "lead": ParagraphStyle("lead", fontName=SANS, fontSize=11.5, leading=18,
                           textColor=INK, spaceAfter=12),
    "label": ParagraphStyle("label", fontName=SANS_B, fontSize=10.5, leading=16,
                            textColor=NAVY, spaceAfter=4),
    "quote": ParagraphStyle("quote", fontName=SANS_I, fontSize=10.5, leading=16.5,
                            textColor=INK, leftIndent=14, spaceAfter=10),
    "small": ParagraphStyle("small", fontName=SANS, fontSize=9, leading=14,
                            textColor=MUTED, spaceAfter=8),
}


def box(flowables, bg=WASH, pad=13, rule=ACCENT):
    t = Table([[flowables]], colWidths=[6.5 * inch - 2])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), pad),
        ("RIGHTPADDING", (0, 0), (-1, -1), pad),
        ("TOPPADDING", (0, 0), (-1, -1), pad),
        ("BOTTOMPADDING", (0, 0), (-1, -1), pad - 3),
        ("LINEBEFORE", (0, 0), (0, -1), 2.2, rule),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def p(text, style="body"):
    return Paragraph(text, S[style])


# ---------------------------------------------------------------- the content

QUESTIONS = [
    ("Who owns the files if I stop paying?",
     ["There are two ways to sell a website. You can build it and hand it over, or you can build it and rent it. Both are legal. Only one of them lets you leave.",
      "On a rental you pay every month, and what you are paying for is access. The company keeps the actual files. Stop paying and the site goes away, along with every photo, every page of text, and every bit of ranking you built up over three years."],
     "You own the files. They are yours once the build is paid for, and I will send them to you if you ever ask.",
     "As long as you&rsquo;re a client, the site is yours. That is not the same sentence. Listen for it."),

    ("Whose name is on the domain registration?",
     ["Your domain is your address. If it is registered in the web company&rsquo;s name instead of yours, they control whether your website exists. Usually that is not sinister, just laziness during setup. But the day you want to leave, it stops being a technicality.",
      "<b>Check it yourself, free, in thirty seconds.</b> Go to lookup.icann.org and type in your own domain. It will tell you the registrant. If that is not you or your company, you have a conversation to have."],
     "It is in your name. Here is the registrar login.",
     "We manage all the domain stuff for you. Managing it and owning it are different things."),

    ("Whose name is on the hosting account?",
     ["Same logic as the domain, one layer down. Hosting is where the files actually live.",
      "There is a complaint on record from an owner whose site was pulled offline entirely, and another whose site was left showing a blank server error page after the contract ended. In both cases the owner had no access to the hosting account and no way to fix it."],
     "In your name, on your card, and you have the login.",
     "We handle all that for you. Handling it is fine. Owning it is not the same thing."),

    ("Can I have the login today, in writing?",
     ["This is the fastest test in the list, and the one I would run first.",
      "There is a complaint on file where an owner&rsquo;s entire grievance was that he had been asking for his own login and could not get it. He paid for the site. He could not get into it.",
      "You should not have to ask twice. You should not have to ask once, really. It should have been handed to you on day one.",
      "<b>Ask by email</b>, so there is a record. Then actually log in and change something small. A company that gives you a login that does not work has answered the question."],
     "Sent. Here it is, and here is how to change your own phone number.",
     "What do you need it for?"),

    ("What happens to my site the day I cancel?",
     ["Everyone has a good answer for how things start. Ask about how they end.",
      "The failure cases on record: site removed from the internet entirely, site left showing a default server page, site still up but the owner locked out and unable to update a phone number."],
     "Nothing. It keeps running. You have the files, the domain and the hosting, so there is nothing for me to take.",
     "Any answer that requires them to do something. If the site surviving your departure depends on their cooperation, you do not own it."),

    ("Is there a contract term, and exactly how long is the cancellation window?",
     ["<b>This is the one.</b>",
      "Here is a pattern that shows up over and over in complaint files. A twelve month agreement. Billing starts the day you sign. Onboarding takes two months. The cancellation window is sixty days.",
      "Do the arithmetic. Your window to get out closes before you have seen the thing work.",
      "That is not an accident and it is not unusual. It is a standard structure, it is legal, and it is why people end up paying for a year of something they knew was wrong by week three.",
      "<b>Ask it in these words:</b> How many months am I committed to, when does billing start, and what is the last day I can cancel without owing the rest? Write the three answers down. If that third date lands before you would realistically know whether it is working, you are not buying a service. You are buying a year."],
     "There is no term. You are paying for a build, not a subscription.",
     "Anything where the cancel-by date arrives before the work does."),

    ("How many other companies in my trade and my area are on this same template?",
     ["Cookie-cutter website is the phrase owners actually use for this, and it does two kinds of damage.",
      "The obvious one: a homeowner getting three quotes sees three nearly identical sites and cannot tell you apart.",
      "The less obvious one: if your site is one of two hundred built on the same skeleton with the same page structure, you are competing against all of them for the same search terms with nothing to distinguish you.",
      "<b>How to check:</b> ask for three live sites they have built for your trade. Open all three on your phone. If the layout is identical and only the photos changed, you have your answer."],
     "A number. Yours would be the only one in your parish, or here are four I built and they are all different.",
     "Every site we build is customized for the client. Customized means they changed the colors."),

    ("What exactly gets delivered each month, and how do I check it myself?",
     ["This is the question that separates marketing from monthly billing.",
      "One of the most common complaints on file is simply that nothing arrived. No reports, no updates, no evidence of work, just a charge. The owner could not prove work was not happening and the company did not have to prove it was.",
      "You want a deliverable you can verify without taking anyone&rsquo;s word for it.",
      "<b>Worth asking too:</b> is the Google Search Console account in my name, and can I look at it whenever I want? If the data about your own website lives somewhere you cannot see, you are being asked to trust a number somebody else reads to you."],
     "Four blog posts a month, you will see them on the site. A monthly report from your own Search Console, and here is how to log in and read it yourself.",
     "A category. SEO, optimization, ongoing maintenance, content strategy. Those are not deliverables. You cannot tell whether you received them."),

    ("Is the price fixed, or does it move with my revenue?",
     ["There is a complaint on record from an owner who was asked for his profit and loss statements during a sales process, and was then quoted a price based on what he was making.",
      "Decide for yourself whether that is reasonable. But you should know it happens before you hand over financials, not after.",
      "More common and less dramatic: no published price at all. Every quote is custom, nothing is comparable, and you have no way to tell whether you are being charged the same as the guy down the road."],
     "A number, or at least a floor. Builds start at X. The monthly is Y and it does not change.",
     "A process. We would need to understand your business first."),
]


def build():
    doc = BaseDocTemplate(
        str(OUT), pagesize=LETTER,
        leftMargin=1.0 * inch, rightMargin=1.0 * inch,
        topMargin=0.9 * inch, bottomMargin=0.9 * inch,
        title="9 Questions To Ask A Web Company Before You Pay Them A Dollar",
        author="Dayne Trosclair, Strykora", subject="A checklist for contractors",
    )

    def footer(canvas, d):
        canvas.saveState()
        n = canvas.getPageNumber()
        if n > 1:
            canvas.setStrokeColor(RULE)
            canvas.setLineWidth(0.5)
            canvas.line(d.leftMargin, 0.72 * inch, d.width + d.leftMargin, 0.72 * inch)
            canvas.setFont(SANS, 8)
            canvas.setFillColor(MUTED)
            canvas.drawString(d.leftMargin, 0.54 * inch, "Strykora  ·  Thibodaux, Louisiana  ·  strykora.com")
            canvas.drawRightString(d.width + d.leftMargin, 0.54 * inch, str(n))
        canvas.restoreState()

    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=footer)])

    st = []

    # ---- cover
    if LOGO.exists():
        st += [Image(str(LOGO), width=1.9 * inch, height=1.9 * inch * 0.26,
                     kind="proportional"), Spacer(1, 40)]
    st += [
        p("9 Questions To Ask A Web Company<br/>Before You Pay Them A Dollar", "cover_h"),
        p("Number 6 is the one that decides whether you own anything.", "cover_sub"),
        p("A checklist for contractors.<br/><br/>Written by Dayne Trosclair, Strykora &mdash; Thibodaux, Louisiana.", "cover_by"),
        Spacer(1, 46),
        box([p("Why am I giving this away?", "h2"),
             p("Because I build websites for a living, and the fastest way to show a contractor I am not like the last guy is to hand him the questions that expose the last guy."),
             p("Some people read this, check their own setup, and find out they are fine. Good. Some find out they do not own their site, and a few of those end up calling me. That is the whole catch. There is no card and I am not going to chase you."),
             p("Read it, use it on whoever you are talking to, and keep it.")]),
        PageBreak(),
    ]

    # ---- before you start
    st += [
        p("Before you start", "h2"),
        p("Every question in here came out of a real complaint filed by a real business owner. Better Business Bureau files, Trustpilot, consumer complaint boards. I did not make any of them up, and I am not going to name the companies involved. You can go find them yourself if you want.", "lead"),
        p("The point is not who did it. The point is that it keeps happening the same way, and nine questions would have caught it every time."),
        p("Ask these before money moves. Ask them on the phone and write down the answers. A company that gives you straight answers to all nine is probably fine. A company that goes vague on four, five and six is telling you something."),
        Spacer(1, 16),
        box([p("The three I would never skip are 4, 5 and 6. They carry the most money in the complaint files, and they are the ones most owners have never thought to ask.", "body")]),
        PageBreak(),
    ]

    # ---- the nine
    for i, (title, paras, good, bad) in enumerate(QUESTIONS, start=1):
        block = [p(f"QUESTION {i}", "qnum"), p(title, "qtitle")]
        block += [p(t) for t in paras]
        block += [
            Spacer(1, 4),
            box([p("A good answer sounds like", "label"), p(good, "quote")],
                bg=colors.HexColor("#EFF5FF")),
            Spacer(1, 9),
            box([p("A bad answer sounds like", "label"), p(bad, "quote")],
                bg=colors.HexColor("#FBF2F2"), rule=colors.HexColor("#C0453C")),
        ]
        st += [KeepTogether(block[:3])] + block[3:]
        if i < len(QUESTIONS):
            st.append(PageBreak())

    # ---- close
    st += [
        PageBreak(),
        p("What to do with this", "h2"),
        p("Print it or keep it on your phone. Run it down the next time somebody calls you about your website, including if that somebody is me."),
        p("If you went through these and did not like your own answers, that is worth knowing. Most owners find out at the worst possible moment instead."),
        Spacer(1, 22),
        p("One offer, and then I will leave you alone", "h2"),
        p("If you read this and realized you are not sure what you actually own, here is what I will do."),
        p("Send me your website address and I will <b>rebuild your homepage for free</b> and put it on a private link. Not a report about your website. The page itself, built for your company, that you can open on your phone."),
        p("It is yours to keep whether you ever hire me or not."),
        p("Then if you want, fifteen minutes on the phone and I will walk you through what I changed and why. I will also look up your domain and hosting beforehand and tell you straight whose name they are in. Takes me two minutes and you should know."),
        Spacer(1, 10),
        box([p("Custom sites start at $3,750, a $500 deposit starts it, and every file is yours once it is paid for. I am in Thibodaux and you can call me.", "body"),
             p("<b>Dayne Trosclair &mdash; Strykora</b><br/>strykora.com", "body")]),
        Spacer(1, 20),
        p("<b>P.S.</b> If you only do one thing from this list, do number 4. Email whoever runs your site right now and ask for the login in writing. What comes back, and how fast, will tell you most of what you need to know.", "small"),
    ]

    doc.build(st)
    print(f"wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build()
