package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/charmbracelet/lipgloss"
	"github.com/muesli/termenv"
)

func init() {
	// Force ANSI color output regardless of TTY detection
	lipgloss.SetColorProfile(termenv.ANSI)
	os.Setenv("CLICOLOR_FORCE", "1")
}

// Colors — restrained palette
var (
	cyan   = lipgloss.Color("6")
	yellow = lipgloss.Color("3")
	white  = lipgloss.Color("15")
	gray   = lipgloss.Color("8")
)

// Styles
var (
	nameStyle = lipgloss.NewStyle().
			Foreground(cyan).
			Bold(true)

	roleStyle = lipgloss.NewStyle().
			Foreground(white).
			Bold(true)

	dimStyle = lipgloss.NewStyle().
			Foreground(gray)

	sectionStyle = lipgloss.NewStyle().
			Foreground(cyan).
			Bold(true)

	labelStyle = lipgloss.NewStyle().
			Foreground(yellow).
			Width(12)

	boldStyle = lipgloss.NewStyle().
			Foreground(white).
			Bold(true)

	dividerStyle = lipgloss.NewStyle().
			Foreground(gray)
)

const width = 80

func divider() string {
	return dividerStyle.Render(strings.Repeat("─", width))
}

func section(title string) string {
	return fmt.Sprintf("\n%s\n%s", sectionStyle.Render(title), divider())
}

func label(text string) string {
	return labelStyle.Render(text)
}

func dim(text string) string {
	return dimStyle.Render(text)
}

func bold(text string) string {
	return boldStyle.Render(text)
}

func main() {
	var b strings.Builder

	// Header
	b.WriteString("\n")
	b.WriteString(nameStyle.Render("Granth Agarwal"))
	b.WriteString("\n")
	b.WriteString(roleStyle.Render("Backend Engineer"))
	b.WriteString(" ")
	b.WriteString(dim("·"))
	b.WriteString(" ")
	b.WriteString(dim("Systems · APIs · Scale"))
	b.WriteString("\n")

	// Contact
	b.WriteString(section("CONTACT"))
	b.WriteString("\n")
	b.WriteString(fmt.Sprintf("  %s granthcodes@gmail.com\n", label("Email")))
	b.WriteString(fmt.Sprintf("  %s github.com/hey-granth\n", label("GitHub")))
	b.WriteString(fmt.Sprintf("  %s linkedin.com/in/granth-agarwal\n", label("LinkedIn")))
	b.WriteString(fmt.Sprintf("  %s granth.tech\n", label("Web")))

	// Stack
	b.WriteString(section("STACK"))
	b.WriteString("\n")
	b.WriteString(fmt.Sprintf("  %s Python, SQL, JavaScript\n", label("Languages")))
	b.WriteString(fmt.Sprintf("  %s Django, FastAPI, Celery\n", label("Frameworks")))
	b.WriteString(fmt.Sprintf("  %s PostgreSQL, Redis, pgvector, PostGIS\n", label("Databases")))
	b.WriteString(fmt.Sprintf("  %s Docker, Linux, GCP, Git\n", label("Infra")))

	// Experience
	b.WriteString(section("EXPERIENCE"))
	b.WriteString("\n\n")
	b.WriteString(fmt.Sprintf("  %s %s Freelance %s\n", bold("Backend Developer"), dim("·"), dim("(Oct 2025 – Present)")))
	b.WriteString(fmt.Sprintf("  %s\n", dim("Full ownership from architecture to deployment")))
	b.WriteString("    • 40+ REST APIs with comprehensive documentation\n")
	b.WriteString("    • 230+ automated tests across multiple services\n")
	b.WriteString("    • PostGIS spatial queries for warehouse routing\n")
	b.WriteString("    • Redis + Celery async task workflows\n")
	b.WriteString("\n")
	b.WriteString(fmt.Sprintf("  %s %s EverythingAboutAI %s\n", bold("Python Developer"), dim("·"), dim("(Jul – Aug 2025)")))
	b.WriteString(fmt.Sprintf("  %s\n", dim("FastAPI automation services and pipeline integrations")))
	b.WriteString("    • FastAPI microservices for automation\n")
	b.WriteString("    • Make.com integration pipelines\n")

	// Projects
	b.WriteString(section("PROJECTS"))
	b.WriteString("\n\n")
	b.WriteString(fmt.Sprintf("  %s %s\n", bold("TrustSystem"), dim("— Patent-backed identity verification")))
	b.WriteString("    pgvector + Sentence Transformers for fraud detection\n")
	b.WriteString(fmt.Sprintf("    %s\n", dim("Patent #202511094809 · Django, PostgreSQL, Redis")))
	b.WriteString("\n")
	b.WriteString(fmt.Sprintf("  %s %s\n", bold("StandardStitch"), dim("— Multi-tenant commerce platform")))
	b.WriteString("    Enterprise backend with PostGIS spatial queries\n")
	b.WriteString(fmt.Sprintf("    %s\n", dim("40+ APIs · Django, PostgreSQL, PostGIS, Celery")))
	b.WriteString("\n")
	b.WriteString(fmt.Sprintf("  %s %s\n", bold("MemeTrends"), dim("— Real-time analytics engine")))
	b.WriteString("    Redis leaderboards with time-decay algorithms\n")
	b.WriteString(fmt.Sprintf("    %s\n", dim("O(log N) operations · Django, Redis, Celery")))

	// Credentials
	b.WriteString(section("CREDENTIALS"))
	b.WriteString("\n")
	b.WriteString(fmt.Sprintf("  %s Multi-Modal Identity Verification System\n", label("Patent")))
	b.WriteString(fmt.Sprintf("              %s\n", dim("#202511094809 · Published Nov 2025")))
	b.WriteString(fmt.Sprintf("  %s 5000+ members · Elixir Tech Community Lead\n", label("Community")))
	b.WriteString(fmt.Sprintf("  %s 230+ automated tests across projects\n", label("Testing")))

	// Footer
	b.WriteString("\n")
	b.WriteString(divider())
	b.WriteString("\n")
	b.WriteString(dim("Open to backend engineering roles · granthcodes@gmail.com"))
	b.WriteString("\n\n")

	fmt.Print(b.String())
}
